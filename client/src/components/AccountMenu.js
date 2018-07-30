import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

// icons
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import PeopleIcon from '@material-ui/icons/People';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const styles = {
  list: {
    width: 250
  },
  avatar: {
    maxWidth: 120,
    width: '100%',
    height: 'auto'
  },
  bio: {
    textAlign: 'center'
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 30
  }
};

class AccountMenu extends Component {
  render() {
    const { classes, user } = this.props;
    user.bio = "I am a graduate of Harvard Business School class of 2030";

    const avatarContainerStyle = user.bio ? { paddingBottom: 0 } : {};

    return (
      <div className={classes.list}>
        <List component="nav">
          {/* <CancelIcon className={classes.close} /> */}
          <ListItem style={avatarContainerStyle}>
            <Grid container justify="center">
              <Link to={'/profile/' + user.id}>
                <Avatar
                  className={classes.avatar}
                  src={window.location.origin + '/' + user.img}
                  alt="profile picture"
                />
              </Link>
            </Grid>
          </ListItem>
          {
            user.bio &&
            <ListItem component={Typography} variant="caption" align="center">
              {user.bio}
            </ListItem>
          }
          <ListItem
            component={Link}
            to={'/profile/' + user.id}
            button
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Your Profile" />
          </ListItem>
          <ListItem
            component={Link}
            to="/messages"
            button
          >
            <ListItemIcon>
              <Badge className={classes.margin} badgeContent={4} color="secondary">
                <EmailIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItem>
          <ListItem
            component={Link}
            to="/settings"
            button
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            component={Link}
            to="/connections"
            button
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Connections (92)" />
          </ListItem>
          <ListItem
            component={Link}
            to="/views"
            button
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Views (223)" />
          </ListItem>
          <ListItem button>
            <Grid container justify="center">
              <ListItemIcon>
                <NavigateNextIcon />
              </ListItemIcon>
            </Grid>
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(AccountMenu);
