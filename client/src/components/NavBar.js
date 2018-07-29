import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
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

class MenuAppBar extends React.Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = { anchorEl: null };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="account-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  </Menu>
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
