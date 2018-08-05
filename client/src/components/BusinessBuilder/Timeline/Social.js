import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  btn: {
    display: 'block',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    borderRadius: 0.5 * theme.spacing.unit,
    paddingTop: 0.5 * theme.spacing.unit,
    paddingBottom: 0.5 * theme.spacing.unit,
    paddingRight: 0.5 * theme.spacing.unit,
    cursor: 'pointer',
  },
  icon: {
    marginLeft: 2,
  },
});

class Social extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-twitter"}>
              <span className={classes.icon + " fa fa-twitter"}></span>
              Connect with Twitter
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-facebook"}>
              <span className={classes.icon + " fa fa-facebook"}></span>
              Connect with Facebook
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-instagram"}>
              <span className={classes.icon + " fa fa-instagram"}></span>
              Connect with Instagram
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-linkedin"}>
              <span className={classes.icon + " fa fa-linkedin"}></span>
              Connect with LinkedIn
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-pinterest"}>
              <span className={classes.icon + " fa fa-pinterest"}></span>
              Connect with Pinterest
            </a>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subheading" margin="normal">
            <a className={classes.btn + " btn btn-block btn-social btn-google"}>
              <span className={classes.icon + " fa fa-google"}></span>
              Connect with Google
            </a>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Social);
