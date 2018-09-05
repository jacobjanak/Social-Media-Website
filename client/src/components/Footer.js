import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import { Button } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FontAwesome from 'react-fontawesome';
import Spacer from './Spacer';

const styles = theme => ({
  root: {
    background: '#263238',
    color: '#d0d0d0',
    // backgroundImage: 'linear-gradient(to right, black, #002171)'
  },
  column: {
    textAlign: 'center',
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit,
  },
  icon: {
    fontSize: 16,
    color: 'black',
  },
});

const Footer = props => {
  const { classes } = props;

  return (
    <Toolbar className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Spacer half />
          <Grid container>
            <Grid className={classes.column} item xs={12} sm={4}>
              <img
                src="/img/logo.png"
                alt="logo"
                style={{
                  maxWidth: '100%',
                  marginBottom: 16,
                }}
              />
              <Typography variant="body1" color="inherit">
                Innovations City is a web-based platform helping Early-Stage Entrepreneurs to effectively build successful businesses through intelligent research automation.
              </Typography>
            </Grid>
            <Grid className={classes.column} item xs={12} sm={4}>
              <Typography variant="title" color="inherit">
                Links
              </Typography>
              <Spacer half />
              <Typography
                variant="body1"
                gutterBottom
                color="inherit"
                style={{ cursor: 'not-allowed' }}
              >
                Investor Relations
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="inherit"
                style={{ cursor: 'not-allowed' }}
              >
                Partnerships
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="inherit"
                style={{ cursor: 'not-allowed' }}
              >
                Advertisement
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                color="inherit"
                style={{ cursor: 'not-allowed' }}
              >
                Press Release
              </Typography>
            </Grid>
            <Grid className={classes.column} item xs={12} sm={4}>
              <Typography variant="title" color="inherit">
                Contact
              </Typography>
              <Spacer half />
              <Typography variant="body1" gutterBottom color="inherit">
                <b>Address:</b> P.O. Box 33075 San Diego, CA 92163
              </Typography>
              <Typography variant="body1" gutterBottom color="inherit">
                <b>Email:</b> info@innovationscity.com
              </Typography>
              <Typography variant="body1" gutterBottom color="inherit">
                <b>Phone:</b> 858.381.2505
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/*
        <IconButton href="https://twitter.com/" target="_blank">
          <FontAwesome className={classes.icon} name="twitter" />
        </IconButton>
        <IconButton href="https://www.facebook.com/" target="_blank">
          <FontAwesome className={classes.icon} name="facebook" />
        </IconButton>
        */}
        
        <Grid item xs={12}>
          <Divider style={{ background: '#A9A9A9' }} />
          <Spacer half />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" noWrap color="inherit">
            &copy; 2018 InnovationsCity
          </Typography>
          <Spacer half />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default withStyles(styles)(Footer);
