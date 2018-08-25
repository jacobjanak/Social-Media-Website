import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
  }
});

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.Auth.login(email, password)
      .then(user => {
        this.props.history.replace(`/profile/${user._id}`)
      })
      .catch(err => alert(err.response.data.message))
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={8} md={6} lg={4}>
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
                <TextField
                  label="Email"
                  name="email"
                  margin="normal"
                  fullWidth
                  autoFocus
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
              </CardContent>
              <CardContent>
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
                  to="/forgot"
                >
                  Forgot password
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button + ' ' + classes.link}
            component={Link}
            to="/signup"
          >
            Don't have an account? Sign up
            {/* <ChevronRightIcon fontSize="inherit" /> */}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
