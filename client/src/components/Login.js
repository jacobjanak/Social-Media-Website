import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import qs from 'qs';
import AuthService from './AuthService';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';
import Alert from './Alert';
import Spacer from './Spacer';

const styles = theme => ({
  card: {
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0
    }
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  link: {
    textTransform: 'none'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
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
      .then(user => window.location.reload())
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
        <Grid item xs={12}>
          <Hidden xsDown>
            <Spacer />
          </Hidden>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <form noValidate onSubmit={this.handleSubmit}>
              <CardContent>
                <Typography variant="display1" color="primary">
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
                  label="Email"
                  name="email"
                  margin="normal"
                  fullWidth
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  fullWidth
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <Grid container justify="flex-end">
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/forgot"
                    size="small"
                  >
                    Forgot password
                    {/* <ChevronRightIcon fontSize="inherit" /> */}
                  </Button>
                </Grid>
              </CardContent>
              <CardContent style={{ paddingTop: 0 }}>
                <Button
                  className={classes.button}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  className={classes.button + ' ' + classes.link}
                  component={Link}
                  to="/signup"
                >
                  Don't have an account?
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12}>

        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
