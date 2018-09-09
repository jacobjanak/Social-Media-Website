import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import AuthService from './AuthService';
import AccountMenu from './AccountMenu';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

const links = [
  {
    label: 'Team',
    url: '/team',
    auth: false,
  },
  {
    label: 'Contact',
    url: '/contact',
    auth: false,
  },
  {
    label: 'Login',
    url: '/login',
    auth: true,
  },
  {
    label: 'Sign Up',
    url: '/signup',
    auth: true,
  },
];

const styles = theme => ({
  root: {
    backgroundColor: '#263238',
  },
  flex: {
    flexGrow: 1,
  },
  logo: {
    marginTop: -4,
    marginBottom: -4,
    height: 48,
  },
  link: {
    textTransform: 'none',
  },
  search: {
    marginRight: theme.spacing.unit,
    width: 200,
    borderBottom: '1px solid rgba(255, 255, 254, 1)',
    color: 'white',
  },
  avatar: {
    marginLeft: 2 * theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
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

          {/* Logo */}
          <Button
            className={classes.link}
            component={Link}
            to="/"
            color="inherit"
            disableRipple
          >
            <img className={classes.logo} src="/img/logo.png" alt="logo" />
          </Button>

          {/* Flex span to push links to right of navbar */}
          <span className={classes.flex}></span>

          {/* Seach bar */}
          <Hidden smDown>
            <Input
              className={classes.search}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              disableUnderline
              endAdornment={(
                <InputAdornment position="end" style={{ color: 'inherit' }}>
                  <IconButton
                    color="inherit"
                    aria-label="search"
                    component={Link}
                    to="/search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )}
            />
          </Hidden>

          {/* Menu (desktop) */}
          <Hidden smDown>
            { links.map((link, i) => (!link.auth || !user) ? (
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

          {/* Mobile menu */}
          <Hidden mdUp>
            <Button
              aria-owns={anchorEl ? 'mobile-menu' : null}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleClick}
            >
              Menu
            </Button>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                component={Link}
                to={"/search"}
              >
                Search
                <SearchIcon className={classes.rightIcon} />
              </MenuItem>
              { links.map((link, i) => (!link.auth || !user) ? (
                <MenuItem
                  component={Link}
                  to={link.url}
                  onClick={this.handleClose}
                  key={i}
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
