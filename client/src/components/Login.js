import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import qs from 'qs';
import AuthService from './AuthService';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import LockIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';
import Alert from './Alert';
import Spacer from './Spacer';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // fix IE11 issue
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 3,
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  link: {
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit,
      textDecoration: 'underline',
    }
  },
  submit: {
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    marginTop: 2 * theme.spacing.unit,
    color: theme.palette.error.main,
  },
});

class Login extends Component {
  constructor(props) {
    super();
    this.Auth = new AuthService();

    const params = qs.parse(props.history.location.search.slice(1));
    this.state = {
      key: params.key || false, // used to confirm email
      open: false,
      alertText: 'Email confirmed! You may login now',
      email: '',
      password: '',
      emailNotConfirmed: false,
      lastEmailChecked: '',
      error: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    // if they are being sent here via email 'confirm' button
    //NOTE: auto-fill email?
    if (this.state.key) {
      API.confirmEmail(this.state.key)
      .then(() => {
        this.setState({
          key: false,
          alertText: 'Email confirmed! You may login now',
          open: true
        }, () => {
          this.props.history.replace('/login')
        })
      })
    }
  }

  closeAlert = () => this.setState({ open: false });

  resendEmail = () => {
    API.resendConfirmation(this.state.lastEmailChecked)
    .then(() => {
      //NOTE: make the snackbar popup
      this.setState({
        emailNotConfirmed: false,
        lastEmailChecked: '',
        open: true,
        alertText: 'Email sent',
      })
    })
    .catch(err => {
      if (err.response) {
        this.setState({
          emailNotConfirmed: false,
          lastEmailChecked: '',
          error: true,
          errorMessage: err.response.data.message
        })
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.Auth.login(email, password)
      .then(() => window.location.reload())
      .catch(err => {
        if (err.response) {
          if (err.response.data.emailNotConfirmed) {
            this.setState({
              emailNotConfirmed: true,
              lastEmailChecked: email,
              error: true,
              errorMessage: 'You must confirm your email address before you can login.',
            })
          } else {
            this.setState({
              emailNotConfirmed: false,
              lastEmailChecked: '',
              error: true,
              errorMessage: err.response.data.message
            })
          }
        }
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    // hide the 'resend email' button too
    this.setState({ [name]: value, error: false })
  };

  render() {
    const { classes } = this.props;
    const { error, errorMessage, emailNotConfirmed } = this.state;

    return this.state.key ? (
      <div>
        <Spacer />
        <CircularProgress size={50} />
      </div>
    ) : (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Alert
          message={this.state.alertText}
          open={this.state.open}
          closeAlert={this.closeAlert}
        />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography variant="headline" align="center">
                Login
              </Typography>
              { (error && !emailNotConfirmed) && (
                <div className={classes.error}>
                  <Typography color="inherit">
                    { errorMessage }
                  </Typography>
                </div>
              )}
              { emailNotConfirmed && (
                <div className={classes.error}>
                  <Typography color="inherit">
                    { errorMessage }
                  </Typography>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    style={{ marginTop: 8 }}
                    onClick={this.resendEmail}
                  >
                    Resend Email Verification
                    <SendIcon className={classes.rightIcon} />
                  </Button>
                </div>
              )}
              <TextField
                label="Email Address"
                name="email"
                margin="normal"
                fullWidth
                required
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                margin="normal"
                fullWidth
                required
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Button
                className={classes.button + ' ' + classes.submit}
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
              >
                Login
              </Button>
              <Grid container justify="center">
                <div style={{ flexGrow: 1 }}></div>
                <Button
                  className={classes.button + ' ' + classes.link}
                  component={Link}
                  to="/signup"
                  size="small"
                >
                  Don't have an account?
                </Button>
                <Hidden xsDown>
                  <span style={{ lineHeight: '32px' }}>&bull;</span>
                </Hidden>
                <Button
                  className={classes.button + ' ' + classes.link}
                  component={Link}
                  to="/forgot"
                  size="small"
                >
                  Forgot your password?
                </Button>
                <div style={{ flexGrow: 1 }}></div>
              </Grid>
            </form>
          </Paper>
        </main>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
