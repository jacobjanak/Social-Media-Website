import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import withAuth from './withAuth';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

// components
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';

if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
}

const styles = theme => ({
  root: {
    marginTop: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      marginTop: 0
    }
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <React.Fragment>
            <NavBar />
            <Grid
              id="app"
              className={classes.root}
              justify={'center'}
              container
            >
              <Route exact path="/" component={withAuth(Home)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile/:id" component={withAuth(Profile)} />
            </Grid>
          </React.Fragment>
        </Router>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
