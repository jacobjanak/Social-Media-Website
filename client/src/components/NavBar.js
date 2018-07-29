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
      open: false
    };
  }

  toggleMenu = bool => {
    this.setState({ open: bool })
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    // must be in render or it won't update
    const user = this.Auth.user();

    console.log(user)

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
                  <IconButton
                    aria-owns={open ? 'account-menu' : null}
                    aria-haspopup="true"
                    onClick={() => this.toggleMenu(true)}
                    color="inherit"
                  >
                    <Avatar
                      src={ user.img }
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
                      tabIndex={0}
                      role="button"
                      onClick={() => this.toggleMenu(false)}
                      onKeyDown={() => this.toggleMenu(false)}
                    >
                      <AccountMenu user={user} />
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
