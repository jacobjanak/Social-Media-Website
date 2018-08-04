import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Spacer from '../../Spacer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  leftPaper: {
    paddingTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginRight: 2 * theme.spacing.unit
    }
  },
  rightPaper: {
    paddingTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginLeft: 2 * theme.spacing.unit
    }
  },
  list: {
    paddingTop: 0
  },
  formControl: {
    marginTop: 2 * theme.spacing.unit
  },
});

class Overview extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <Grid container>

        {/* Info previous page */}
        <Grid item xs={12}>
          <Typography variant="headline">
            { this.props.name }
          </Typography>
          <Typography variant="subheading">
            { this.props.bio }
          </Typography>
        </Grid>
        <Spacer half={true} />

        {/* Description */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Full Description
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            margin="dense"
            multiline
            fullWidth
            value={this.props.description}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Problem and solution */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Problem
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="problem"
            margin="dense"
            placeholder="What problem is your business solving?"
            fullWidth
            value={this.props.problem}
            onChange={handleChange}
          />
        </Grid>
        <Spacer half={true} />
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Solution
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="solution"
            margin="dense"
            placeholder="How is your business solving the problem?"
            fullWidth
            value={this.props.solution}
            onChange={handleChange}
          />
        </Grid>
        <Spacer half={true} />
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Benefits to Audience
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="benefits"
            margin="dense"
            placeholder="What benefits are you giving your audience?"
            fullWidth
            value={this.props.benefits}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Markets and competitors */}
        <Grid item xs={12} md={6}>
          <Paper className={classes.leftPaper}>
            <Typography variant="headline" align="center">
              Markets
            </Typography>
            <List className={classes.list}>
              {[1, 2, 3, 4].map(i => (
                <ListItem key={i}>
                  <TextField
                    name={'market' + i}
                    value={this.props['market' + i]}
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{i + '.'}</InputAdornment>
                      ),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Hidden mdUp={true}>
          <Spacer />
        </Hidden>
        <Grid item xs={12} md={6}>
          <Paper className={classes.rightPaper}>
            <Typography variant="headline" align="center">
              Competitors
            </Typography>
            <List className={classes.list}>
              {[1, 2, 3, 4].map(i => (
                <ListItem key={i}>
                  <TextField
                    name={'competitor' + i}
                    value={this.props['competitor' + i]}
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{i + '.'}</InputAdornment>
                      ),
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Spacer />

        {/* Tested */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Testing
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Choose one</FormLabel>
            <RadioGroup
              aria-label="Have you tested or surveyed?"
              name="tested"
              value={this.props.tested}
              onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                label="We have tested or surveyed"
                control={<Radio />}
              />
              <FormControlLabel
                value="no"
                label="We have not tested yet"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Overview);
