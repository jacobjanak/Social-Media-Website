import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Spacer from '../../Spacer';

const styles = theme => ({
  videoWrapper: {
    position: 'relative',
    margin: 'auto',
  	paddingBottom: '56.25%',
    // maxWidth: 560,
    width: '100%',
    height: 0
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});

class Start extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center">
        <Spacer half />
        <Typography variant="display1" align="center" color="primary" gutterBottom>
          Building a business has never been easier.
        </Typography>

        <Spacer half={true} />

        <Grid item xs={11} sm={9} md={7} lg={6} xl={4}>
          <div className={classes.videoWrapper}>
            <iframe
              className={classes.video}
              src="https://www.youtube.com/embed/1Tdq2NvEjYs"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </Grid>

        <Spacer half={true} />

        <Typography variant="headline" align="center">
          Save time. Save money. Save polar bears.
        </Typography>

        <Spacer half={true} />

        <Grid container justify="center">
          <Button
            variant="raised"
            color="primary"
            size="large"
            component={Link}
            to="/business-builder/1"
          >
            Get Started
          </Button>
        </Grid>

        <Spacer />
      </Grid>
    )
  }
}

export default withStyles(styles)(Start);
