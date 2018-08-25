import React, { Component } from 'react';
import API from '../utils/API';
// import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Spacer from './Spacer';

class Reset extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  handleSubmit = () => {
    const { password, confirmPassword } = this.state;

    // need to figure out how to get params from url

    return console.log(this.props.match.params)

    if (password === confirmPassword) {
      API.changePassword(password, this.props.match.params.random)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    return (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Hidden xsDown>
          <Spacer />
        </Hidden>
        <Card>
          <CardContent>
            <Typography variant="headline">
              Change password
            </Typography>
            <TextField
              label="New password"
              name="password"
              margin="normal"
              fullWidth
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              label="Confirm password"
              name="confirmPassword"
              margin="normal"
              fullWidth
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </CardContent>
          <CardContent>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Reset;
