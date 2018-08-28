import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import withAuth from './withAuth';
import withoutAuth from './withoutAuth';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Spacer from './Spacer';
import theme from '../theme/theme';

// components
import NavBar from './NavBar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Forgot from './Forgot';
import Reset from './Reset';
import Profile from './Profile';
import Dashboard from './Dashboard';
import StartBusinessBuilder from './BusinessBuilder/Start';
import BusinessBuilder from './BusinessBuilder';
import Entrepreneur from './Entrepreneur';
import Welcome from './Welcome';

//NOTE: probably don't need this
if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
}

const styles = theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  app: {
    flexGrow: 1,
  }
});

class App extends Component {
  state = {
    business: {},
    emailJustConfirmed: false,
  };

  changeBusiness = business => {
    this.setState({ business })
  };

  confirmEmail = cb => {
    this.setState({ emailJustConfirmed: true }, cb)
  };

  render() {
    const { classes } = this.props;
    const { business } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className={classes.root}>
              <NavBar />

              <ScrollToTop>
                <Grid className={classes.app} justify="center" container>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/signup" component={withoutAuth(SignUp)} />
                  <Route exact path="/(login|confirm)/" component={withoutAuth(Login)} />
                  <Route exact path="/forgot" component={withoutAuth(Forgot)} />
                  <Route path="/reset" component={withoutAuth(Reset)} />
                  <Route exact path="/welcome" component={withoutAuth(Welcome)} />
                  <Route exact path="/entrepreneur" component={withAuth(Entrepreneur)} />
                  <Route exact path="/dashboard" component={withAuth(Dashboard, { changeBusiness: this.changeBusiness })} />
                  <Route exact path="/profile/:id" component={withAuth(Profile)} />
                  <Route exact path="/business-builder" component={withAuth(StartBusinessBuilder)} />
                  <Route exact path="/business-builder/:step" component={withAuth(BusinessBuilder, { business })} />
                </Grid>
              </ScrollToTop>

              {/*
                I had this in the root styles:
                minHeight: '100vh',
                but it made a scrollbar on mobile cuz of
                the padding for lower nav
              */}

              {/* for footer
              <div style={{ flexGrow: 3 }}></div> */}

            </div>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
