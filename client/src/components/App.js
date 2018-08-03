import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import withAuth from './withAuth';
import withoutAuth from './withoutAuth';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Grid from '@material-ui/core/Grid';

// components
import NavBar from './NavBar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Dashboard from './Dashboard'
import StartBusinessBuilder from './BusinessBuilder/Start'
import BusinessBuilder from './BusinessBuilder'

if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
}

const styles = theme => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  app: {
    flexGrow: 1,
    marginTop: 4 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit,
    // [theme.breakpoints.down('xs')]: {
    //   marginTop: 0
    // }
  }
});

class App extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', this.updateSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
  }

  updateSize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  };

  render() {
    const { classes } = this.props;
    const mobile = this.state.width < 600;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div className={classes.root}>
              <NavBar mobile={mobile} />
              { mobile ? <MobileNav /> : null }

              <ScrollToTop>
                <Grid className={classes.app} justify="center" container>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={withoutAuth(Login)} />
                  <Route exact path="/signup" component={withoutAuth(SignUp)} />
                  <Route exact path="/dashboard" component={withAuth(Dashboard)} />
                  <Route exact path="/profile/:id" component={withAuth(Profile)} />
                  <Route exact path="/business-builder" component={withAuth(StartBusinessBuilder)} />
                  <Route path="/business-builder/:step" component={withAuth(BusinessBuilder)} />
                </Grid>
              </ScrollToTop>

              {/* for footer */}
              <div style={{ flexGrow: 3 }}></div>
              {/* <Footer /> */}

            </div>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
