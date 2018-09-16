import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import TeamMembers from './TeamMembers';
import UploadedImage from './UploadedImage';
import SocialIcons from './SocialIcons';
import Footer from './Footer';
import Spacer from './Spacer';
import team from '../data/team.json';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  activeImg: {
    float: 'left',
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    width: 420,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 2 * theme.spacing.unit,
      marginRight: '50%',
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      width: '100%',
    },
  },
  activeText: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    whiteSpace: 'pre-line'
  },
  socialContainer: {
    display: 'inline',
    [theme.breakpoints.only('sm')]: {
      paddingLeft: 4 * theme.spacing.unit,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
});

class Team extends Component {
  state = {
    active: false,
  };

  static getDerivedStateFromProps(props, state) {
    // this method gets the active team members name from the url
    // but also sets active to false if the url changes to just /team
    const { person } = props.match.params;
    if (person) {
      const name = person.replace('-', ' ');
      team.forEach(person => {
        if (person.name === name) {
          state.active = person;
          return state;
        }
      })
    } else {
      state.active = false;
      return state;
    }
  }

  setActive = person => {
    const url = `/team/${person.name.replace(' ', '-')}`;
    this.props.history.push(url)
    this.setState({ active: person })
  }

  render() {
    const { classes } = this.props;
    const { active } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12} sm={10} xl={8}>
          <Paper className={classes.paper}>

            {/* Active team member */}
            { active && (
              <React.Fragment>
                <div className={classes.activeImg}>
                  <UploadedImage img={'/img/team/' + active.img} fill />
                </div>
                <Typography
                  className={classes.activeText}
                  variant="display1"
                  color="textPrimary"
                >
                  {active.name}
                </Typography>
                <Spacer half />
                <Typography
                  className={classes.activeText}
                  variant="subheading"
                  color="primary"
                  gutterBottom
                >
                  <b style={{ color: 'black' }}>Role:</b> {active.role}
                </Typography>
                <Typography
                  className={classes.activeText}
                  variant="subheading"
                  gutterBottom
                >
                  <b>Experience:</b> {active.experience} years
                </Typography>
                { active.email && (
                  <Typography
                    className={classes.activeText}
                    variant="subheading"
                    gutterBottom
                  >
                    <b>Email:</b> {active.email}
                  </Typography>
                )}
                { active.phone && (
                  <Typography
                    className={classes.activeText}
                    variant="subheading"
                    gutterBottom
                  >
                    <b>Phone:</b> {active.phone}
                  </Typography>
                )}
                <Grid container className={classes.socialContainer}>
                  <SocialIcons links={active} />
                </Grid>
                <Spacer half />
                { active.summary && (
                  <React.Fragment>
                    <Typography
                      className={classes.activeText}
                      variant="subheading"
                      align="left"
                      gutterBottom
                    >
                      <b>Summary:</b>
                    </Typography>
                    <Typography
                      className={classes.activeText}
                      variant="body1"
                    >
                      {active.summary}
                    </Typography>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}

            {/* List of team members */}
            <Grid container justify="center">
              { active && <Spacer />}
              <Typography variant="display1" color="textPrimary" gutterBottom>
                Our Team
              </Typography>
            </Grid>

            {/* List every team member */}
            <TeamMembers
              history={this.props.history}
              active={active ? active.name : false}
            />

          </Paper>
        </Grid>
        <Hidden smDown>
          <Spacer />
        </Hidden>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Team);
