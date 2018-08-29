import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';
import AuthService from './AuthService';
import AccountMenu from './AccountMenu';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const links = [
  {
    label: 'Contact',
    url: '/contact',
    auth: false,
  },
  {
    label: 'Login',
    url: '/login',
    noAuth: true,
  },
  {
    label: 'Sign Up',
    url: '/signup',
    noAuth: true,
  },
];

const styles = theme => ({
  root: {
    backgroundColor: '#263238',
  },
  flex: {
    flexGrow: 1,
  },
  logoButton: {
    marginLeft: 20,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  logo: {
    marginTop: -4,
    marginBottom: -4,
    height: 48,
  },
  link: {
    textTransform: 'none'
  },
  mobileMenu: {

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
      user: false,
      open: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    if (this.Auth.user()) {
      API.getUser()
      .then(res => {
        const user = res.data;
        this.setState({ user })
      })
    }
  }

  logout = () => {
    this.Auth.logout()
    window.location.reload()
  };

  // for mobile menu
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  // for mobile menu
  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  // for account menu
  toggleMenu = bool => {
    this.setState({ open: bool })
  };

  render() {
    const { classes, styleProps, mobile, position } = this.props;
    const { user, open, anchorEl } = this.state;

    return (
      <AppBar
        className={classes.root}
        position={position || 'static'}
        style={styleProps}
      >
        <Toolbar>
          <Button
            className={classes.link + ' ' + classes.logoButton}
            component={Link}
            to="/"
            color="inherit"
            disableRipple
          >
            {/* <Typography variant="title" color="inherit">
              InnovationsCity
            </Typography> */}
            <img className={classes.logo} src="/img/logo.png" alt="logo" />
          </Button>
          <span className={classes.flex}></span>

          {/* Links */}
          <Hidden xsDown>
            { links.map((link, i) => link.noAuth || !user ? (
              <Button
                className={classes.link}
                component={Link}
                to={link.url}
                color="inherit"
                key={i}
              >
                {link.label}
              </Button>
            ) : null)}
          </Hidden>

          <Hidden smUp>

            <Button
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleClick}
            >
              Menu
            </Button>

            <Menu
              className={classes.mobileMenu}
              id="menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              { links.map((link, i) => link.noAuth || !user ? (
                <MenuItem
                  component={Link}
                  to={link.url}
                  onClick={this.handleClose}
                >
                  { link.label }
                </MenuItem>
              ) : null)}
            </Menu>
          </Hidden>


          {/* Account menu */}
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
