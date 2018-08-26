import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';
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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SendIcon from '@material-ui/icons/Send';
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
    marginBottom: theme.spacing.unit,
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
      snackbarText: 'Email confirmed! You may login now',
      email: '',
      password: '',
      emailNotConfirmed: false,
      lastEmailChecked: '',
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
          snackbarText: 'Email confirmed! You may login now',
          open: true
        }, () => {
          this.props.history.replace('/login')
        })
      })
    }
  }

  toggleSnackbar = () => {
    this.setState({ open: !this.state.open })
  }

  resendEmail = () => {
    API.resendConfirmation(this.state.lastEmailChecked)
    .then(() => {
      //NOTE: make the snackbar popup
      this.setState({
        open: true,
        snackbarText: 'Email sent',
      })
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.err)
        console.log(err.response.data.message)
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
        if (err.response.data.emailNotConfirmed) {
          this.setState({
            emailNotConfirmed: true,
            lastEmailChecked: email,
          })
        }
      })
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    // hide the 'resend email' button too
    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;
    const { emailNotConfirmed } = this.state;

    return this.state.key ? (
      <div>
        <Spacer />
        <CircularProgress size={50} />
      </div>
    ) : (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.toggleSnackbar}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={(
            <span id="message-id">{this.state.snackbarText}</span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.toggleSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
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
                { emailNotConfirmed && (
                  <div className={classes.error}>
                    <Typography color="inherit">
                      You must confirm your email address before you can login.
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
                  Don't have an account? Sign up
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
