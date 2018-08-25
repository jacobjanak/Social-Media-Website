import React, { Component } from 'react';
import API from '../utils/API';
import queryString from 'query-string';
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
  constructor(props) {
    super()
    const params = queryString.parse(props.history.location.search);

    this.state = {
      key: params.key,
      password: '',
      confirmPassword: '',
    };
  }

  handleSubmit = () => {
    const { password, confirmPassword, key } = this.state;

    if (password === confirmPassword) {
      API.changePassword(password, key)
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
              type="password"
              fullWidth
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              label="Confirm password"
              name="confirmPassword"
              margin="normal"
              type="password"
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