import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UploadedImage from './UploadedImage';
import SocialIcons from './SocialIcons';
import team from '../data/team.json';
import VisibilityIcon from '@material-ui/icons/Visibility';

const styles = theme => ({
  person: {
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    paddingBottom: 2 * theme.spacing.unit,
  },
  button: {
    paddingTop: 2 * theme.spacing.unit,
    textAlign: 'center',
    textTransform: 'none',
  },
  activeCover: {
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  visibilityIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 84,
    color: 'white',
  },
});

class TeamMembers extends Component {
  render() {
    const { classes, history, active } = this.props;

    return (
      <Grid container>
        { team.map((person, i) => (
          <Grid item className={classes.person} xs={12} sm={6} md={3} key={i}>
            <Button
              className={classes.button}
              fullWidth
              disabled={active === person.name}
              onClick={() => history.push('/team/' + person.name.replace(' ', '-'))}
            >
              <Grid container style={{ position: 'relative' }}>
                { active === person.name && (
                  <div className={classes.activeCover}>
                    <VisibilityIcon className={classes.visibilityIcon} />
                  </div>
                )}
                <UploadedImage img={'/img/team/' + person.img} fill />
                <Grid item xs={12}>
                  <Typography variant="headline" align="center">
                    {person.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subheading" align="center" color="primary">
                    {person.role}
                  </Typography>
                </Grid>
              </Grid>
            </Button>
            <Grid container justify="center">
              <SocialIcons links={person} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(TeamMembers);
