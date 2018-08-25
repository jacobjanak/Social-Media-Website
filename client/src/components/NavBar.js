import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import AccountMenu from './AccountMenu';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    textTransform: 'none'
  },
  avatar: {
    marginLeft: theme.spacing.unit
  }
});

class MenuAppBar extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      open: false
    };
  }

  logout = () => {
    this.Auth.logout()
    // reloade window to redirect only if on a protected route
    window.location.reload()
  };

  toggleMenu = bool => {
    this.setState({ open: bool })
  };

  render() {
    const { classes, mobile } = this.props;
    const { open } = this.state;

    // must be in render or it won't update
    const user = this.Auth.user();

    return (
      <AppBar position="static">
        <Toolbar>
          <Button
            className={classes.link}
            component={Link}
            to="/"
            color="inherit"
          >
            <Typography variant="title" color="inherit">
              InnovationsCity
            </Typography>
          </Button>
          <span className={classes.flex}></span>
          { mobile ? null : (
            <React.Fragment>
              { user ? (
                <React.Fragment>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/entrepreneur"
                    color="inherit"
                  >
                    Entrepreneur
                  </Button>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/dashboard"
                    color="inherit"
                  >
                    Dashboard
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/login"
                    color="inherit"
                  >
                    Login
                  </Button>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/signup"
                    color="inherit"
                  >
                    Sign Up
                  </Button>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          { user && (
            <div>
              <IconButton
                className={classes.avatar}
                aria-owns={open ? 'account-menu' : null}
                aria-haspopup="true"
                color="inherit"
                onClick={() => this.toggleMenu(true)}
              >
                <Avatar
                  src={window.location.origin + user.img}
                  alt="profile picture"
                />
              </IconButton>
              <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => this.toggleMenu(false)}
                onOpen={() => this.toggleMenu(true)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => this.toggleMenu(false)}
                  onKeyDown={() => this.toggleMenu(false)}
                >
                  <AccountMenu
                    user={user}
                    logout={this.logout}
                  />
                </div>
              </SwipeableDrawer>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(MenuAppBar);
