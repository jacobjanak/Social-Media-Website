import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AuthService from './AuthService';
import API from '../utils/API';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import UploadedImage from './UploadedImage';
import Spacer from './Spacer';

import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';

const styles = theme => ({
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
      isOwner: false,
    };
  }

  componentDidMount() {
    // get user from db
    API.getUser(this.state.key)
    .then(res => {
      const user = res.data;
      this.setState(state => {
        // check if they're the owner so they can edit this profile
        if (user._id === this.Auth.user().id) {
          state.isOwner = true;
        }
        state.user = user;
        return state;
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <Grid item xs={12} sm={10} lg={6}>
        <Spacer half />

        {/* Header */}
        <Grid container style={{ alignItems: 'center' }}>
          <UploadedImage img={user.img} large rounded border />

          <div style={{ flexGrow: 1, marginLeft: 24 }}>
            <Typography
              variant="display1"
              style={{ color: 'black' }}
              gutterBottom
            >
              {user.firstName + ' ' + user.lastName}
            </Typography>
            <Typography variant="body1">
              {user.bio}
            </Typography>
          </div>

          <div style={{ alignSelf: 'flex-start' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginBottom: 16 }}
              disabled
            >
              <GroupAddIcon className={classes.leftIcon} />
              Connect
            </Button>
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled
            >
              <MailIcon className={classes.leftIcon} />
              Message
            </Button>
          </div>
        </Grid>
        <Spacer half />

        {/* Info */}
        <Typography variant="headline" gutterBottom>
          Info
        </Typography>
        <List style={{ paddingTop: 0 }}>
          <ListItem>
            <Avatar>
              <GroupIcon />
            </Avatar>
            <ListItemText primary="0 connections &bull; 0 mutual" />
          </ListItem>
          <ListItem>
            <Avatar>
              <LocationOnIcon />
            </Avatar>
            <ListItemText primary={`${user.city}, ${user.state}, ${user.country}`} />
          </ListItem>
          <ListItem>
            <Avatar>
              <SchoolIcon />
            </Avatar>
            <ListItemText primary={user.education} />
          </ListItem>
        </List>
        <Spacer half />

        {/* Businesses */}
        <Typography variant="headline" gutterBottom>
          Businesses
        </Typography>

      </Grid>
    )
  }
}

export default withStyles(styles)(Profile);
