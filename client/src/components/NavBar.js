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

const styles = {
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
  }
};

class MenuAppBar extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      anchorEl: null,
      open: false
    };
  }

  toggleMenu = bool => {
    this.setState({ open: bool })
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const isLoggedIn = this.Auth.isLoggedIn();

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
              isLoggedIn ? (
                <div>
                  <IconButton
                    aria-owns={open ? 'account-menu' : null}
                    aria-haspopup="true"
                    onClick={this.toggleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Avatar
                    alt="Adelle Charles"
                    src="/static/images/uxceo-128.jpg"
                  />
                  <SwipeableDrawer
                    anchor="right"
                    open={this.state.open}
                    onClose={() => this.toggleMenu(false)}
                    onOpen={() => this.toggleMenu(true)}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={() => this.toggleMenu(false)}
                      onKeyDown={() => this.toggleMenu(false)}
                    >
                      <AccountMenu />
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
                  <Button
                    className={classes.link}
                    component={Link}
                    to="/signup"
                    color="inherit"
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
