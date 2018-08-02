import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FontAwesome from 'react-fontawesome';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.text.primary
  },
  icon: {
    color: 'white',
    padding: '0px 10px'
  }
});

const Footer = props => {
  const { classes } = props;

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          <small>&copy; 2018 InnovationsCity</small>
        </Typography>

        <span style={{ flexGrow: 1 }} />

        <Link to="/dashboard">
          <FontAwesome className={classes.icon} name="facebook" />
        </Link>
        <Link to="/dashboard">
          <FontAwesome className={classes.icon} name="twitter" />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);
