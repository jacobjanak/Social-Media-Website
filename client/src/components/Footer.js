import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { Button } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FontAwesome from 'react-fontawesome';

const styles = theme => ({
  // root: {
  //   backgroundColor: 'transparent',
  //   color: 'black'
  // },
  icon: {
    fontSize: 16,
    color: 'black'
  }
});

const Footer = props => {
  const { classes } = props;

  return (
    <Toolbar>
      <Typography variant="subheading" color="inherit" noWrap>
        {/* &copy; 2018 InnovationsCity */}
      </Typography>

      <span style={{ flexGrow: 1 }} />

      <IconButton href="https://twitter.com/" target="_blank">
        <FontAwesome className={classes.icon} name="twitter" />
      </IconButton>
      <IconButton href="https://www.facebook.com/" target="_blank">
        <FontAwesome className={classes.icon} name="facebook" />
      </IconButton>
    </Toolbar>
  );
};

export default withStyles(styles)(Footer);
