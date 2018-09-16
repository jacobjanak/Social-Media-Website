import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import API from '../../API';
import UploadedImage from '../UploadedImage'
import Footer from '../Footer'
import Spacer from '../Spacer';
import './Dashboard.css';

const styles = theme => ({
  loading: {
    marginTop: 8 * theme.spacing.unit,
  },
  paper: {
    padding: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  accountPaper: {
    padding: 2 * theme.spacing.unit,
  },
  account: {
    [theme.breakpoints.up('lg')]: {
      // neutralize the width so that stuff stays centered
      marginLeft: -220,
    },
    width: 220,
    paddingRight: 4 * theme.spacing.unit,
  },
  businessContainer: {
    // neutralizing the padding from paper
    marginLeft: -(4 * theme.spacing.unit),
    marginRight: -(4 * theme.spacing.unit),
    width: `calc(100% + ${8 * theme.spacing.unit}px)`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },
  },
  business: {
    margin: 4 * theme.spacing.unit,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '20%',
      marginRight: '20%',
    },
  },
  businessInfo: {
    height: 80,
    paddingLeft: 2 * theme.spacing.unit,
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  homeButton: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textTransform: 'none',
    fontWeight: 'normal',
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Dashboard extends Component {
  state = {
    businesses: false,
    user: false,
  };

  componentDidMount() {
    const { user } = this.props;

    API.getUser()
    .then(res => this.setState({ user: res.data }))
    .catch(err => console.log(err))

    API.getBusinesses()
    .then(res => this.setState({ businesses: res.data }))
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    const { businesses, user } = this.state;

    if (!businesses || !user) {
      return <CircularProgress className={classes.loading} />;
    }

    return (
      <React.Fragment>

        {/* Account side bar */}
        <Hidden smDown>
          <div className={classes.account}>
            <Paper className={classes.accountPaper}>
              <Grid container justify="center">
                <Link to={'/profile/' + user.url}>
                  <UploadedImage
                    img={user.img}
                    alt="profile picture"
                    rounded
                  />
                </Link>
              </Grid>
              <Typography
                variant="title"
                align="center"
                gutterBottom
                style={{ marginTop: 16 }}
              >
                {user.firstName + ' ' + user.lastName}
              </Typography>
              <Button
                className={classes.link}
                component={Link}
                to={'/profile/' + user.url}
                size="small"
                fullWidth
              >
                View your profile &#xbb;
              </Button>
              <Button
                className={classes.link}
                component={Link}
                to="/connections"
                size="small"
                fullWidth
                disabled
              >
                0 Connections
              </Button>
              <Button
                className={classes.link}
                component={Link}
                to="/views"
                size="small"
                fullWidth
                disabled
              >
                0 Profile views
              </Button>
            </Paper>
            {/*
            <Button
              className={classes.homeButton}
              variant="outlined"
              component={Link}
              to="/home"
              fullWidth
            >
              <HomeIcon className={classes.leftIcon} />
              To site home
            </Button>
            */}
          </div>
        </Hidden>

        {/* My businesses */}
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <Paper className={classes.paper}>
            <Grid container>
              <Typography
                className={classes.grow}
                variant={businesses.length > 0 ? 'headline' : 'display1'}
                color="textPrimary"
                align={businesses.length > 0 ? 'default' : 'center'}
                gutterBottom
              >
                Your Businesses
              </Typography>
              { businesses.length > 0 && (
                <Hidden xsDown>
                  {/* div is here so the height of button is good */}
                  <div>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/business-builder"
                    >
                      <AddCircle
                        className={classes.leftIcon}
                        style={{ fontSize: 18 }}
                      />
                      New business
                    </Button>
                  </div>
                </Hidden>
              )}
            </Grid>
            <Grid className={classes.businessContainer} container>
              { businesses.length > 0 ? (
                <React.Fragment>
                  { businesses.map((business, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Paper className={classes.business}>
                        <UploadedImage img={business.logo} fill />
                        <Grid container className={classes.businessInfo}>
                          <Typography
                            className={classes.grow}
                            variant={
                              business.name.length > 12
                              ? 'subheading'
                              : 'headline'
                            }
                          >
                            { business.name }
                          </Typography>
                          <IconButton
                            color="primary"
                            aria-label="Edit"
                            onClick={() => this.props.history.push('/business/edit/' + business.url)}
                          >
                            <EditIcon className={classes.icon} />
                          </IconButton>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </React.Fragment>
              ) : (
                <Grid className={classes.noBusiness} item xs={12}>
                  <Spacer half />
                  <Typography
                    variant="subheading"
                    align="center"
                    gutterBottom
                  >
                    No businesses yet.
                  </Typography>
                  <Spacer half />
                  <Grid container justify="center">
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/business-builder"
                    >
                      <AddIcon className={classes.leftIcon} />
                      Create yours now
                    </Button>
                  </Grid>
                  <Hidden smUp>
                    <Spacer />
                  </Hidden>
                </Grid>
              )}
            </Grid>
            { businesses.length > 0 && (
              <Hidden smUp>
                <Spacer half />
                <Grid container align="center">
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/business-builder/1"
                    >
                      Create new business
                    </Button>
                  </Grid>
                </Grid>
                <Spacer />
              </Hidden>
            )}

            {/* <Hidden smUp>
              <Grid container justify="center">
                <Button
                  className={classes.homeButton}
                  variant="outlined"
                  size="small"
                  component={Link}
                  to="/home"
                  fullWidth
                >
                  <HomeIcon className={classes.leftIcon} />
                  To site home
                </Button>
              </Grid>
            </Hidden> */}
          </Paper>
        </Grid>

        {/* <Hidden mdUp xsDown>
          <Grid container justify="center">
            <Button
              className={classes.homeButton}
              variant="outlined"
              size="small"
              component={Link}
              to="/home"
            >
              <HomeIcon className={classes.leftIcon} />
              To site home
            </Button>
          </Grid>
        </Hidden> */}

        <Hidden xsDown>
          <Spacer />
          <Spacer />
        </Hidden>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Dashboard);
