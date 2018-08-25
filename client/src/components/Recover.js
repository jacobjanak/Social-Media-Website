import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

class Recover extends Component {
  state = {
    email: '',
  };

  handleSubmit = () => {
    API.resetPassword(this.state.email)
    .then(res => console.log(res))
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
              Reset password
            </Typography>
            <TextField
              label="Your email"
              name="email"
              margin="normal"
              fullWidth
              value={this.state.email}
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
              Send recovery info
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Recover;
