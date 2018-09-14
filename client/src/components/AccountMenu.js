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
import UploadedImage from './UploadedImage';

// icons
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import PeopleIcon from '@material-ui/icons/People';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CancelIcon from '@material-ui/icons/Cancel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = {
  list: {
    width: 250,
  },
  bio: {
    textAlign: 'center'
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 30
  },
  statistic: {
    display: 'block'
  },
  verticalDivider: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: 1
  },
  divideContainer: {
    position: 'relative'
  }
};

class AccountMenu extends Component {
  render() {
    const { classes, user, logout } = this.props;

    const liProps = {
      variant: 'body1'
    };

    return (
      <div className={classes.list}>
        <List component="nav">
          {/* <CancelIcon className={classes.close} /> */}
          <ListItem style={user.bio ? { padding: 0 } : {}}>
            <Grid container justify="center">
              <Link to={'/profile/' + user.url}>
                <UploadedImage img={user.img} alt="profile picture" rounded />
              </Link>
            </Grid>
          </ListItem>
          { user.bio && (
            <ListItem
              component={Typography}
              variant="body1"
              align="center"
            >
              {user.bio}
            </ListItem>
          )}
          <Divider />
          <Grid container>
            <Grid className={classes.divideContainer} item xs={6}>
              <ListItem
                component={Link}
                to="/connections"
                button
                disabled
                style={{ paddingRight: 0 }}
              >
                <ListItemText primaryTypographyProps={{
                    align: 'center',
                    ...liProps
                }}>
                  <Typography
                    className={classes.statistic}
                    variant="display1"
                  >
                    0
                  </Typography>
                  <Typography variant="body1">Connections</Typography>
                </ListItemText>
              </ListItem>
              <Divider className={classes.verticalDivider} />
            </Grid>
            <Grid item xs={6}>
              <ListItem
                component={Link}
                to="/views"
                button
                disabled
                style={{ paddingRight: 0 }}
              >
                <ListItemText primaryTypographyProps={{
                    align: 'center',
                    ...liProps
                }}>
                  <Typography
                    className={classes.statistic}
                    variant="display1"
                  >
                    0
                  </Typography>
                  <Typography variant="body1">Views</Typography>
                </ListItemText>
              </ListItem>
            </Grid>
          </Grid>
          <Divider />
          <ListItem
            component={Link}
            to={'/profile/' + user.url}
            button
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={liProps}>
              Profile
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to={'/'}
            button
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={liProps}>
              My Dashboard
            </ListItemText>
          </ListItem>
          {/*
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
            <ListItemText primaryTypographyProps={liProps}>
              Messages
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to="/settings"
            button
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={liProps}>
              Settings
            </ListItemText>
          </ListItem>
          */}
          <ListItem
            button
            onClick={logout}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={liProps}>
              Logout
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <Grid container justify="center">
              <ListItemIcon style={{ marginRight: 0 }}>
                <NavigateNextIcon />
              </ListItemIcon>
            </Grid>
          </ListItem>
        </List>
        {/*
        <List>
          <ListItem
            component={Link}
            to="/connections"
            button
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primaryTypographyProps={liProps}
            >
              Connections (92)
            </ListItemText>
          </ListItem>
          <ListItem
            component={Link}
            to="/views"
            button
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText
              inset={true}
              primaryTypographyProps={liProps}
            >
              Views (223)
            </ListItemText>
          </ListItem>
          <ListItem button>
            <Grid container justify="center">
              <ListItemIcon>
                <NavigateNextIcon />
              </ListItemIcon>
            </Grid>
          </ListItem>

        </List>
        */}
      </div>
    );
  }
}

export default withStyles(styles)(AccountMenu);
