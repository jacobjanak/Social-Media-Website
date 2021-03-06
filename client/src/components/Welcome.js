import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Spacer from './Spacer';

const styles = theme => ({
  button: {
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
})

class Welcome extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={11} sm={10} md={8} lg={6} xl={4}>
        <Spacer />
        <Typography variant="display1" color="primary" gutterBottom>
          Welcome!
        </Typography>
        <Typography variant="subheading">
          Thank you for joining InnovationsCity
        </Typography>
        <Spacer half />
        <Typography variant="subheading">
          An activation email has been sent to your email address. Please check your inbox or spam folder and activate your account in order to access your InnovationsCity account.
        </Typography>
        <Spacer half />
        <Button
          className={classes.button}
          component={Link}
          variant="contained"
          color="primary"
          to="/"
        >
          Back to Home
        </Button>
        <Spacer />
      </Grid>
    );
  }
}

export default withStyles(styles)(Welcome);
