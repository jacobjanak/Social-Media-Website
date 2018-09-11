import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import UploadedImage from './UploadedImage';
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
  person: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
  },
  iconButton: {
    fontSize: 16,
    height: 32,
    width: 32,
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
      height: 48,
      width: 48,
    },
  },
  activeImg: {
    float: 'left',
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    width: 421,
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
    marginLeft: 4 * theme.spacing.unit,
    marginRight: 4 * theme.spacing.unit,
  },
  activeText: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    whiteSpace: 'pre-line'
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
              <Typography variant="display1" color="textPrimary">
                Our Team
              </Typography>
            </Grid>
            <Spacer half />
            <Grid container>
              { team.map((person, i) => (
                <Grid item className={classes.person} xs={12} sm={6} md={3} key={i}>
                  <UploadedImage
                    img={'/img/team/' + person.img}
                    fill
                    onClick={() => {
                      this.props.history.push('/team/' + person.name.replace(' ', '-'))
                    }}
                  />
                  <Typography
                    variant="headline"
                    align="center"
                    onClick={() => {
                      this.props.history.push('/team/' + person.name.replace(' ', '-'))
                    }}
                  >
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
