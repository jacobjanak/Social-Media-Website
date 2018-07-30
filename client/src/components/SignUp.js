import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AuthService from './AuthService';
import Toggle from './Toggle';
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
  }
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
      investor: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state;

    if (email && password && password === confirmPassword) {
      this.Auth.signUp(
        email,
        password,
        this.state.firstName,
        this.state.lastName,
        {
          entrepreneur: this.state.entrepreneur,
          investor: this.state.investor
        }
      )
      .then(user => this.props.history.replace('/profile/' + user._id))
      .catch(err => alert(err.response.data.message))
    }
  }

  handleCheck = event => {
    // for when a checkbox is checked
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card className={classes.card}>
          <form noValidate onSubmit={this.handleSubmit}>
            <CardContent>
              <Typography variant="display1" color="primary">
                Sign Up
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    label="First name"
                    name="firstName"
                    margin="normal"
                    fullWidth
                    value={this.state.firstName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    label="Last name"
                    name="lastName"
                    margin="normal"
                    fullWidth
                    value={this.state.lastName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    label="Email"
                    name="email"
                    margin="normal"
                    fullWidth
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    fullWidth
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.textField}
                    label="Confirm password"
                    name="confirmPassword"
                    type="password"
                    margin="normal"
                    fullWidth
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
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
            <CardContent>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                color="primary"
              >
                Sign Up
              </Button>
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
