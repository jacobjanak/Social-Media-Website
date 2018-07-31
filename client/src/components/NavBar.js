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
  root: {
    flexGrow: 1,
  },
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
    const { classes } = this.props;
    const { open } = this.state;

    // must be in render or it won't update
    const user = this.Auth.user();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.flex}
              variant="title"
              color="inherit"
              component={Link}
              to="/"
            >
              InnovationsCity
            </Typography>
            {
              user ? (
                <div>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/entrepreneurs"
                    color="inherit"
                  >
                    Entrepreneurs
                  </Button>
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/investors"
                    color="inherit"
                  >
                    Investors
                  </Button>
                  <IconButton
                    className={classes.avatar}
                    aria-owns={open ? 'account-menu' : null}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => this.toggleMenu(true)}
                  >
                    <Avatar
                      src={window.location.origin + '/' + user.img}
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
                  {/*
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  */}
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="secondary"
                  >
                    Sign Up
                  </Button>
                </React.Fragment>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(MenuAppBar);
