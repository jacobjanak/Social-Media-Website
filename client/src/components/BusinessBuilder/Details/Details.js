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
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Spacer from '../../Spacer';
import SelectIndustry from './SelectIndustry';

const styles = theme => ({
  section: {
    // marginTop: 4 * theme.spacing.unit
  },
  formControl: {
    display: 'block',
    marginTop: 2 * theme.spacing.unit
  }
});

class Details extends Component {
  render() {
    const {
      classes,
      handleChange,
      handleCheck,
      handleMultiSelect
    } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="display1" align="center">
            Create a Company
          </Typography>
        </Grid>
        <Spacer half={true} />

        {/* Company name */}
        <Grid className={classes.section} item xs={12}>
          <Typography variant="headline" margin="normal">
            Company Name
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Company name"
            name="name"
            margin="dense"
            fullWidth
            value={this.props.name}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Stages */}
        <Grid className={classes.section} item xs={12}>
          <Typography variant="headline" margin="normal">
            Stages
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Funding</FormLabel>
            <RadioGroup
              className={classes.group}
              aria-label="Fund stage"
              name="fundStage"
              value={this.props.fundStage}
              onChange={handleChange}
            >
              <FormControlLabel value="seed" control={<Radio />} label="Seed" />
              <FormControlLabel value="preSeed" control={<Radio />} label="Pre-Seed" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Business</FormLabel>
            <RadioGroup
              className={classes.group}
              aria-label="Business stage"
              name="businessStage"
              value={this.props.businessStage}
              onChange={handleChange}
            >
              <FormControlLabel value="existing" control={<Radio />} label="Existing" />
              <FormControlLabel value="new" control={<Radio />} label="New" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Spacer />

        {/* Industry */}
        <Grid className={classes.section} item xs={12}>
          <Typography variant="headline" margin="normal">
            Industries
          </Typography>
        </Grid>
        <Grid item xs={6}>
          {/* <FormControl> */}
            {/*
            <FormLabel component="legend">
              We profit mainly from
            </FormLabel>
            */}
            {/* <FormGroup> */}
          <FormControlLabel
            label="We sell a product"
            control={
              <Checkbox
                checked={this.props.product}
                onChange={handleCheck}
                name="product"
              />
            }
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            label="We provide a service"
            control={
              <Checkbox
                checked={this.props.service}
                onChange={handleCheck}
                name="service"
              />
            }
          />
            {/* </FormGroup> */}
          {/* </FormControl> */}
        </Grid>
        <Grid item xs={12}>
          <SelectIndustry
            handleChange={handleMultiSelect}
            selected={this.props.industries}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sub industry"
            name="subIndustry"
            margin="normal"
            fullWidth
            value={this.props.subIndustry}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="NAICS number"
            name="naics"
            margin="normal"
            type="number"
            fullWidth
            value={this.props.naics}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

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
            value={this.props.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Zip code"
            name="zip"
            margin="dense"
            type="number"
            fullWidth
            value={this.props.zip}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Bio */}
        <Grid className={classes.section} item xs={12}>
          <Typography variant="headline" margin="normal">
            Short Description
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="bio"
            margin="dense"
            multiline
            fullWidth
            value={this.props.bio}
            onChange={handleChange}
          />
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Details);
