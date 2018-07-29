import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import withAuth from './withAuth';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

// components
import NavBar from './NavBar';

// pages
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
}

const styles = theme => ({
  root: {
    marginTop: 4 * theme.spacing.unit,
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Router>
          <Grid
            className={classes.root}
            justify={'center'}
            container
          >
            <Route exact path="/" component={withAuth(Home)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:id" component={withAuth(Profile)} />
          </Grid>
        </Router>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
