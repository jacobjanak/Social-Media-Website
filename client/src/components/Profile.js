import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AuthService from './AuthService';
import API from '../API';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import UploadedImage from './UploadedImage';
import SocialIcons from './SocialIcons';
import Footer from './Footer';
import Spacer from './Spacer';

// icons
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MailIcon from '@material-ui/icons/Mail';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';

const styles = theme => ({
  root: {
    width: 600,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  loading: {
    marginTop: 8 * theme.spacing.unit,
  },
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit,
    paddingRight: 8 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      borderRadius: 0,
    },
  },
  header: {
    alignItems: 'flex-end',
  },
  nameContainer: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      paddingRight: 4 * theme.spacing.unit,
      paddingLeft: 4 * theme.spacing.unit,
      flexBasis: 0,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: '100%',
      marginTop: 4 * theme.spacing.unit,
      textAlign: 'center',
    },
  },
  socialContainer: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      marginLeft: -8,
    },
  },
  actionContainer: {
    alignSelf: 'flex-start',
    width: '100%',
    marginTop: 2 * theme.spacing.unit,
  },
  actionButton: {
    marginBottom: 2 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  summary: {
    paddingLeft: 3 * theme.spacing.unit,
    whiteSpace: 'pre-line',
  },
  business: {
    marginTop: 4 * theme.spacing.unit,
  },
  businessInfo: {
    flexGrow: 1,
    paddingLeft: 2 * theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      flexBasis: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 2 * theme.spacing.unit,
      width: '100%',
      textAlign: 'center',
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Profile extends Component {
  constructor() {
    super()
    const path = window.location.pathname;
    const key = path.substring(path.lastIndexOf('/') + 1);

    this.Auth = new AuthService();
    this.state = {
      key,
      user: false,
      businesses: [],
      isOwner: false,
    };
  }

  componentDidMount() {
    // get user from db
    let user;
    API.getUser(this.state.key)
    .then(res => {
      user = res.data;
      return API.getBusinesses(user._id);
    })
    .then(res => {
      const businesses = res.data;
      this.setState(state => {
        if (user._id === this.Auth.user().id) {
          state.isOwner = true;
        }
        state.user = user;
        state.businesses = businesses;
        return state;
      })
    })
    .catch(err => window.location.replace('/404'))
  }

  render() {
    const { classes } = this.props;
    const { user, businesses, isOwner } = this.state;

    if (!user) {
      return <CircularProgress className={classes.loading} />;
    }

    let location = ''
    if (user.city) location += `${user.city}, `;
    if (user.state) location += `${user.state}, `;
    if (user.country) location += `${user.country}`;

    const connections = '0 connections' + (isOwner ? '' : ' \u2022 0 mutual');

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Paper className={classes.paper}>

            {/* Header */}
            <Grid container className={classes.header} justify="center">

              {/* Profile picture */}
              <UploadedImage img={user.img} large rounded />

              {/* Name and bio */}
              <div className={classes.nameContainer}>
                <Typography
                  variant="title"
                  color="textPrimary"
                  gutterBottom
                >
                  {user.firstName + ' ' + user.lastName}
                </Typography>
                <Typography variant="body1">
                  {user.bio}
                </Typography>
                <div className={classes.socialContainer}>
                  <SocialIcons links={user} />
                </div>
              </div>

              {/* Actions */}
              <div className={classes.actionContainer}>
                { isOwner ? (
                  <Button
                    className={classes.actionButton}
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/profile/edit"
                  >
                    <EditIcon className={classes.leftIcon} />
                    Edit Profile
                  </Button>
                ) : (
                  <React.Fragment>
                    <Button
                      className={classes.actionButton}
                      variant="contained"
                      color="primary"
                      disabled
                      style={{ marginRight: 8 }}
                    >
                      <MailIcon className={classes.leftIcon} />
                      Message
                    </Button>
                    <Button
                      className={classes.actionButton}
                      variant="contained"
                      color="primary"
                      disabled
                    >
                      <GroupAddIcon className={classes.leftIcon} />
                      Connect
                    </Button>
                  </React.Fragment>
                )}
              </div>
            </Grid>
            <Hidden xlDown>
              <Spacer half />
            </Hidden>
            <Divider />
            <Spacer half />

            {/* Summary */}
            { user.summary && (
              <React.Fragment>
                <Grid item xs={12}>
                  <Typography variant="headline" gutterBottom>
                    Summary
                  </Typography>
                  <Typography
                    className={classes.summary}
                    variant="body1"
                    gutterBottom
                  >
                    { user.summary }
                  </Typography>
                </Grid>
                <Spacer half />
              </React.Fragment>
            )}

            {/* Info */}
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="headline" gutterBottom>
                  Info
                </Typography>
                <List disablePadding>
                  <ListItem>
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                    <ListItemText primary={connections} />
                  </ListItem>
                  { location && (
                    <ListItem>
                      <Avatar>
                        <LocationOnIcon />
                      </Avatar>
                      <ListItemText primary={location} />
                    </ListItem>
                  )}
                  { user.education && (
                    <ListItem>
                      <Avatar>
                        <SchoolIcon />
                      </Avatar>
                      <ListItemText primary={user.education} />
                    </ListItem>
                  )}
                </List>
              </Grid>
            </Grid>
            <Spacer half />

            {/* Businesses */}
            { businesses.length > 0 && (
              <React.Fragment>
                <Divider />
                <Spacer half />
                <Typography variant="headline" gutterBottom>
                  Businesses
                </Typography>
                { businesses.map((business, i) => (
                  <Grid
                    container
                    className={classes.business}
                    justify="center"
                    key={i}
                  >
                    <UploadedImage img={business.logo} large />
                    <div className={classes.businessInfo}>
                      <Typography variant="headline">
                        {business.name}
                      </Typography>
                      <Typography variant="body1">
                        {business.bio}
                      </Typography>
                    </div>
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Paper>
          <Hidden xsDown>
            <Spacer />
          </Hidden>
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Profile);
