import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevicesOutlined';
import BarChartIcon from '@material-ui/icons/BarChartOutlined';
import ForumIcon from '@material-ui/icons/ForumOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import Background from './Background';
import CallToAction from './CallToAction';
import Subscribe from './Subscribe';
import TeamMembers from './TeamMembers';
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
    zIndex: 1150, // covers navbar but not tooltips
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
  cover: {
    // cover is used to make the text more visible by fading the video
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1, // go above the video
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.5), rgba(0,0,0,0))',
    },
    [theme.breakpoints.up('md')]: {
      backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.75), rgba(0,0,0,0), rgba(0,0,0,0))',
    },
  },
  banner: {
    position: 'absolute',
    top: 90,
    left: 60,
    bottom: 60,
    maxWidth: '100%',
    borderRadius: 4 * theme.spacing.unit,
    zIndex: 2, // higher than "cover"
    [theme.breakpoints.up('lg')]: {
      left: 120,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      paddingTop: 100, // for navbar
      backgroundColor: 'rgba(0,0,0,0.4)',
      textAlign: 'center',
    },
  },
  mobileBackground: {
    minHeight: '100%',
    minWidth: '100%',
    height: '100%',
    width: 'auto',
  },
  headline: {
    color: 'white',
    fontFamily: 'Rubik',
  },
  description: {
    color: 'lightgrey',
    marginBottom: 32,
    width: 320,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
  state = {
    navbarPosition: 'sticky',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    if (window.scrollY >= 200) {
      this.setState({ navbarPosition: 'fixed' })
    } else {
      this.setState({ navbarPosition: 'sticky' })
    }
  };

  render() {
    const { classes } = this.props;
    const { navbarPosition } = this.state;

    const styleProps = navbarPosition === 'sticky' ? {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      transition: '0.5s'
    } : {
      transition: '0.5s'
    };

    return (
      <Grid container justify="center">
        <div className={classes.landing}>
          <NavBar position={navbarPosition} styleProps={styleProps} />

          {/* Backgrounds */}
          <div className={classes.background}></div>
          <div className={classes.cover}></div>

          {/* Video - hidden on mobile since it can't autoplay */}
          <Hidden xsDown>
            <Background />
          </Hidden>

          {/* GIF for mobile users */}
          <Hidden smUp>
            <img
              className={classes.mobileBackground}
              src="img/stars.gif"
              alt="night sky"
            />
          </Hidden>

          <div className={classes.banner}>
            <Typography variant="subheading" style={{ color: '#0EEAFC' }}>
              Transforming Early-Stage Entrepreneur's Success
            </Typography>
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
            <Grid container justify="center">
              <Grid item md={12}>
                <CallToAction />
              </Grid>
            </Grid>
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
              <Typography
                variant="display2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
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
              <StoreIcon
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

        {/* Second 'page', subscribe to newsletter, starts */}
        <Grid container justify="center">
          <Subscribe />
        </Grid>
        <Spacer />

        {/* Third 'page' starts */}
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography
              variant="display2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Meet the Team
            </Typography>
          </Grid>
          <Grid item xs={12} lg={10} xl={8}>
            <TeamMembers history={this.props.history} />
          </Grid>
        </Grid>

        <Spacer />
        <Footer />
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
