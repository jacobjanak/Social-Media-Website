import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Spacer from './Spacer';

const styles = theme => ({
  root: {
    width: 600,
    maxWidth: '100%',
    paddingTop: 8 * theme.spacing.unit,
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
  },
  button: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
});

class IncompleteProfile extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display1" color="primary">
          Complete your profile
        </Typography>
        <Spacer half />
        <Typography variant="subheading">
          A valid profile is required for full access to the Innovations City website. This page will go away once all required fields are complete.
        </Typography>
        <Spacer half />
        <Button
          className={classes.button}
          component={Link}
          variant="contained"
          color="primary"
          to="/profile/edit"
        >
          Go to Edit Profile
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(IncompleteProfile);
