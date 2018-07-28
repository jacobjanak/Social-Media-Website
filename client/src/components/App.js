import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import withAuth from './withAuth';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';

// pages
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
}

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <div>
            <Route exact path="/" component={withAuth(Home)} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile/:id" component={withAuth(Profile)} />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
