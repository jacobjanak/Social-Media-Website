import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import UploadedImage from './UploadedImage';
import Footer from './Footer';
import Spacer from './Spacer';
import team from '../data/team.json';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  person: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
  },
  iconButton: {
    fontSize: 16,
    height: 32,
    width: 32,
  }
});

class Team extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center" color="textPrimary">
              Our Team
            </Typography>
            <Spacer half />
            <Grid container>
              { team.map((person, i) => (
                <Grid item className={classes.person} xs={12} sm={6} md={3}>
                  <UploadedImage img={'/img/team/' + person.img} fill />
                  <Typography variant="headline" align="center">
                    {person.name}
                  </Typography>
                  <Typography variant="subheading" align="center" color="primary">
                    {person.role}
                  </Typography>
                  <Grid container justify="center">
                    { person.linkedin && (
                      <a href={person.linkedin} target="_blank">
                        <IconButton className={classes.iconButton} aria-label="Delete">
                          <span className="fa fa-linkedin"></span>
                        </IconButton>
                      </a>
                    )}
                    { person.twitter && (
                      <a href={person.twitter} target="_blank">
                        <IconButton className={classes.iconButton} aria-label="Delete">
                          <span className="fa fa-twitter"></span>
                        </IconButton>
                      </a>
                    )}
                    { person.facebook && (
                      <a href={person.facebook} target="_blank">
                        <IconButton className={classes.iconButton} aria-label="Delete">
                          <span className="fa fa-facebook"></span>
                        </IconButton>
                      </a>
                    )}
                    { person.instagram && (
                      <a href={person.instagram} target="_blank">
                        <IconButton className={classes.iconButton} aria-label="Delete">
                          <span className="fa fa-instagram"></span>
                        </IconButton>
                      </a>
                    )}
                  </Grid>
                </Grid>
              ))}
            </Grid>
            <Spacer />
          </Paper>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Team);
