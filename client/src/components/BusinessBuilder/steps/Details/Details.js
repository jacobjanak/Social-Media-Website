import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SelectIndustry from './SelectIndustry';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  section: {
    marginTop: 4 * theme.spacing.unit
  },
  formControl: {
    display: 'block',
    marginTop: 2 * theme.spacing.unit
  }
});

class Details extends Component {
  constructor(props) {
    super()
    const { firstName, lastName } = props.user;

    this.state = {
      name: `${firstName} ${lastName}'s Company`,
      fundStage: null,
      businessStage: null,
      industries: [],
      city: '',
      zip: '',
      bio: ''
    };
  }

  handleMultiSelect = value => {
    /* value in an array of objects, not strings */
    this.setState({ industries: value })
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="display1" align="center">
              Create a Company
            </Typography>
          </Grid>

          {/* Company name */}
          <Grid className={classes.section} item xs={12}>
            <Typography variant="headline" margin="normal">
              Name
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Company name"
              name="name"
              margin="dense"
              fullWidth
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Grid>

          {/* Stages */}
          <Grid className={classes.section} item xs={12}>
            <Typography variant="headline" margin="normal">
              Stages
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Fund stage</FormLabel>
              <RadioGroup
                className={classes.group}
                aria-label="Fund stage"
                name="fundStage"
                value={this.state.fundStage}
                onChange={this.handleChange}
              >
                <FormControlLabel value="seed" control={<Radio />} label="Seed" />
                <FormControlLabel value="preSeed" control={<Radio />} label="Pre-Seed" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Business stage</FormLabel>
              <RadioGroup
                className={classes.group}
                aria-label="Business stage"
                name="businessStage"
                value={this.state.businessStage}
                onChange={this.handleChange}
              >
                <FormControlLabel value="existing" control={<Radio />} label="Existing" />
                <FormControlLabel value="new" control={<Radio />} label="New" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Industry */}
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
            <Typography variant="headline" margin="normal">
              Industries
            </Typography>
              <Grid item margin="normal" xs={12}>
                <SelectIndustry
                  handleChange={this.handleMultiSelect}
                  selected={this.state.industries}
                />
              </Grid>
            </FormControl>
          </Grid>

          {/* Location */}
          <Grid className={classes.section} item xs={12}>
            <Typography variant="headline" margin="normal">
              Location
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              name="city"
              margin="dense"
              fullWidth
              value={this.state.city}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Zip code"
              name="zip"
              margin="dense"
              type="number"
              fullWidth
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </Grid>

          {/* Bio */}
          <Grid className={classes.section} item xs={12}>
            <Typography variant="headline" margin="normal">
              Description
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="bio"
              margin="dense"
              rows={4}
              multiline
              fullWidth
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Details);
