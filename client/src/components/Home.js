import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CallToAction from './CallToAction';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevicesOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';
import ForumIcon from '@material-ui/icons/ForumOutlined';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import NavBar from './NavBar';
import Footer from './Footer';
import Spacer from './Spacer';

const styles = theme => ({
  landing: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    minHeight: 600,
    overflow: 'hidden',
    marginTop: -64,
    zIndex: 20000, // covers navbar
    [theme.breakpoints.down('xs')]: {
      marginTop: -56,
    },
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    background: 'black',
    zIndex: -1,
  },
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 'initial',
    height: '100%',
    width: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      left: 0,
      right: 'initial',
    },
  },
  banner: {
    position: 'absolute',
    top: 80,
    left: 60,
    bottom: 60,
    maxWidth: '100%',
    marginTop: '64',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      left: 0,
    }
  },
  headline: {
    color: 'white',
    fontFamily: 'Rubik',
  },
  description: {
    color: 'lightgrey',
    marginBottom: 32,
    width: 320,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: 2 * theme.spacing.unit,
      paddingRight: 2 * theme.spacing.unit,
    }
  },
  factoid: {
    marginTop: 4 * theme.spacing.unit,
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
  },
  icon: {
    marginBottom: 2 * theme.spacing.unit,
    fontSize: 60,
    marginLeft: '50%',
    transform: 'translateX(-50%)',
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center">
        <div className={classes.landing}>
          <NavBar position="fixed" styleProps={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} />
          <div className={classes.background}></div>
          <video
            className={classes.video}
            src="/videos/background.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop>
          </video>
          <div className={classes.banner}>
            {/* <Typography variant="subheading" style={{ color: '#14c7ff' }}>
              Transforming Early-Stage Entrepreneur's Success
            </Typography> */}
            <Typography
              className={classes.headline}
              variant="display3"
              noWrap
            >
              Connecting &
            </Typography>
            <Typography
              className={classes.headline}
              variant="display3"
            >
              Empowering
            </Typography>
            <Typography
              className={classes.headline}
              variant="display3"
              style={{ marginBottom: 24 }}
            >
              Innovations
            </Typography>
            <Typography
              className={classes.headline + ' ' + classes.description}
              variant="subheading"
            >
              InnovationsCity is a web-based platform helping Early-Stage Entrepreneurs effectively build successful businesses through intelligent research automation
            </Typography>
            <CallToAction className={classes.action} />
          </div>
        </div>
        <Spacer />

        {/* Second page starts */}
        <Grid item xs={12} lg={10} xl={8}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="headline" align="center">
                Are you ready to get your BIG IDEA started? We're here to help!
              </Typography>
              <Spacer half />
              <Typography variant="display2" align="center" gutterBottom style={{ color: 'black' }}>
                How it Works
              </Typography>
            </Grid>
            <Grid item className={classes.factoid} xs={12} sm={6} md={3}>
              <ImportantDevicesIcon
                className={classes.icon}
                color="inherit"
                style={{ color: '#FF5722' }}
              />
              <Typography variant="headline" align="center" gutterBottom>
                Build a Game Plan
              </Typography>
              <Typography variant="subheading" align="center" gutterBottom>
                Get started with your BIG IDEA and we'll walk you through step by step on creating your gameplan
              </Typography>
            </Grid>
            <Grid item className={classes.factoid} xs={12} sm={6} md={3}>
              <BarChartIcon
                className={classes.icon}
                color="inherit"
                style={{ color: '#9C27B0' }}
              />
              <Typography variant="headline" align="center" gutterBottom>
                Market Score
              </Typography>
              <Typography variant="subheading" align="center" gutterBottom>
                Our intelligent research analysis helps identify how you compare to the local and global markets
              </Typography>
            </Grid>
            <Grid item className={classes.factoid} xs={12} sm={6} md={3}>
              <ForumIcon
                className={classes.icon}
                color="inherit"
                style={{ color: '#03A9F4' }}
              />
              <Typography variant="headline" align="center" gutterBottom>
                Marketplace
              </Typography>
              <Typography variant="subheading" align="center" gutterBottom>
                Connect with vetted professionals and experts in our Marketplace who will help you bring your vision to life
              </Typography>
            </Grid>
            <Grid item className={classes.factoid} xs={12} sm={6} md={3}>
              <BusinessIcon
                className={classes.icon}
                color="inherit"
                style={{ color: '#4CAF50' }}
              />
              <Typography variant="headline" align="center" gutterBottom>
                Funding
              </Typography>
              <Typography variant="subheading" align="center" gutterBottom>
                We help take your BIG IDEA to a whole new level by connecting you with the capital you need
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Spacer />
        <Spacer />
        <Footer />
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
