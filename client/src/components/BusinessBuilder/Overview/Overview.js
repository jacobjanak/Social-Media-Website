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
import ContainedTextField from '../../ContainedTextField';
import Iterator from '../../Iterator';

const styles = theme => ({
  list: {
    padding: 0,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  formControl: {
    marginTop: 2 * theme.spacing.unit,
    width: '100%',
  },
});

class Overview extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <Grid container>

        {/* Info previous page
        <Grid item xs={12}>
          <Typography variant="headline">
            { this.props.name }
          </Typography>
          <Typography variant="subheading">
            { this.props.bio }
          </Typography>
        </Grid>
        <Spacer half={true} /> */}

        {/* Description */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Description
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <ContainedTextField
              name="description"
              label="Full company description"
              rows="8"
              fullWidth
              value={this.props.description}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Spacer />

        {/* Problem and solution */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Problem & Solution
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <ContainedTextField
              name="problem"
              label="Problem"
              placeholder="What problem is your business solving?"
              rows="4"
              fullWidth
              value={this.props.problem}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <ContainedTextField
              name="solution"
              label="Solution"
              placeholder="How is your business solving the problem?"
              rows="4"
              fullWidth
              value={this.props.solution}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Spacer />

        {/* Industry */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Industry
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Iterator
            arr={this.props.markets}
            updateArr={markets => this.props.changeState({ markets })}
            textFieldProps={{ label: 'Target markets' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Iterator
            arr={this.props.competitors}
            updateArr={competitors => this.props.changeState({ competitors })}
            textFieldProps={{ label: 'Competitors' }}
          />
        </Grid>
          {/* <List className={classes.list}>
            {[1, 2, 3].map(i => (
              <ListItem className={classes.listItem} key={i}>
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
          </List> */}

        {/* Competitors */}
          {/*
          <List className={classes.list}>
            {[1, 2, 3].map(i => (
              <ListItem className={classes.listItem} key={i}>
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
          */}

        {/* Benefits to Audience */}
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <ContainedTextField
              name="benefits"
              placeholder="What benefits are you giving your audience over your competitors?"
              label="Benefits to audience"
              rows="4"
              fullWidth
              value={this.props.benefits}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>

        {/* Tested */}
        <Grid item xs={12}>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Testing</FormLabel>
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
