import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import FontAwesome from 'react-fontawesome';

const DashboardIcon = () => (
  <FontAwesome name="tachometer" style={{ marginBottom: 4, fontSize: 24 }} />
);

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2000
  },
};

class MobileNav extends React.Component {
  state = {
    value: 'recents',
    open: false
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { value, open } = this.state;

    return (
      <Paper className={classes.root} elevation={12}>
        <BottomNavigation value={value} showLabels onChange={this.handleChange}>
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Dashboard"
            value="dashboard"
            icon={<DashboardIcon />}
            component={Link}
            to="/dashboard"
          />
          {/*
          <BottomNavigationAction
            label="Account"
            value="account"
            icon={<PersonIcon />}
          />
          */}
          <BottomNavigationAction
            label="More"
            value="more"
            icon={<MenuIcon />}
            buttonRef={node => this.anchorEl = node}
            aria-owns={open ? 'menu-list' : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          />
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem onClick={this.handleClose}>Test</MenuItem>
                      <MenuItem onClick={this.handleClose}>Test</MenuItem>
                      <MenuItem onClick={this.handleClose}>Test</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </BottomNavigation>
      </Paper>
    );
  }
}

export default withStyles(styles)(MobileNav);
