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

const styles = theme => ({
  root: {
    marginTop: 2 * theme.spacing.unit
  },
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
      .then(res => {
        const { user } = res.data;
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
        <Card className={classes.card}>
          <form noValidate onSubmit={this.handleSubmit}>
            <CardContent>
              <Typography variant="display1">
                Login
              </Typography>
              <TextField
                className={classes.textField}
                label="Email"
                name="email"
                margin="normal"
                fullWidth
                value={this.state.email}
                onChange={this.handleChange}
              />
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
                to="/signup"
              >
                Don't have an account?
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
