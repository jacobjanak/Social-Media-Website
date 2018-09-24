import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import validateCharLimits from '../utils/validateCharLimits';
import AuthService from './AuthService';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from '@material-ui/core/Hidden';
import LoadingButton from './LoadingButton';
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
    textTransform: 'none',
  },
  error: {
    marginTop: 2 * theme.spacing.unit,
    color: theme.palette.error.main,
  },
});

class SignUp extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      entrepreneur: false,
      investor: false,
      loading: false,
      error: false,
      errorMessage: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state;

    if (email && password) {
      if (password === confirmPassword) {
        this.setState({ loading: true }, () => {
          this.Auth.signUp({
            email,
            password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: {
              entrepreneur: this.state.entrepreneur,
              investor: this.state.investor
            }
          })
          .then(() => this.props.history.push('/welcome'))
          .catch(err => {
            if (err.response) {
              this.setState({
                error: true,
                loading: false,
                errorMessage: (
                  err.response
                  ? err.response.data.message
                  : "There was an error creating your account and sending a confirmation email."
                )
              })
            }
          })
        })
      } else {
        this.setState({
          error: true,
          errorMessage: 'Passwords must match'
        })
      }
    } else {
      this.setState({
        error: true,
        errorMessage: 'Please fill out all the fields'
      })
    }
  }

  handleCheck = event => {
    // for when a checkbox is checked
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  }

  handleChange = event => {
    const { name, value } = event.target;

    if (validateCharLimits.user({ [name]: value })) {
      this.setState({ [name]: value, error: false });
    }
  }

  render() {
    const { classes } = this.props;
    const { loading, error, errorMessage } = this.state;

    return (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Hidden xsDown>
          <Spacer />
        </Hidden>
        <Card className={classes.card}>
          <form noValidate onSubmit={this.handleSubmit}>
            <CardContent>
              <Typography variant="display1" color="primary">
                Sign Up
              </Typography>
              { error && (
                <div className={classes.error}>
                  <Typography color="inherit">
                    { errorMessage }
                  </Typography>
                </div>
              )}
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First name"
                    name="firstName"
                    margin="dense"
                    fullWidth
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last name"
                    name="lastName"
                    margin="dense"
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    margin="dense"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    margin="dense"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    margin="dense"
                    fullWidth
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
            {/*
            <CardContent>
              <Grid item xs={12}>
                <FormControl
                  className={classes.formControl}
                  component="fieldset"
                >
                  <FormLabel component="legend">
                    Select all that apply
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.investor}
                          onChange={this.handleCheck}
                          name="investor"
                        />
                      }
                      label="I am an investor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.entrepreneur}
                          onChange={this.handleCheck}
                          name="entrepreneur"
                        />
                      }
                      label="I am an entrepreneur"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </CardContent>
            */}
            <CardContent>
              <LoadingButton
                className={classes.button}
                variant="contained"
                type="submit"
                color="primary"
                loading={loading}
              >
                Sign Up
              </LoadingButton>
              <Button
                className={classes.button + ' ' + classes.link}
                component={Link}
                to="/login"
              >
                Already have an account?
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignUp);
