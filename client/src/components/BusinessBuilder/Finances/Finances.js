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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Spacer from '../../Spacer';
import currencies from '../../../data/currencies.json';

const styles = theme => ({
  formControl: {
    display: 'block',
    marginTop: 2 * theme.spacing.unit
  }
});

class Finances extends Component {
  render() {
    const { classes, handleChange } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="display1" align="center">
            Finances
          </Typography>
        </Grid>
        <Spacer half={true} />

        {/* Forecast */}
        {/* <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Forecast
          </Typography>
        </Grid> */}
        <Grid container justify="center">
          <FormControl>
            {/* <FormLabel component="legend" align="center"></FormLabel> */}
            <RadioGroup
              className={classes.group}
              aria-label=""
              name="forecast"
              value={this.props.forecast}
              onChange={handleChange}
            >
              <FormControlLabel
                value="5"
                label="5 year plan"
                control={<Radio />}
              />
              <FormControlLabel
                value="3"
                label="3 year plan"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Currency */}
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="currency">Currency</InputLabel>
            <Select
              value={this.props.currency}
              style={{ width: '100%' }}
              onChange={handleChange}
              inputProps={{
                name: 'currency',
                id: 'currency'
              }}
            >
              {Object.keys(currencies).map((key, i) => (
                <MenuItem value={key} key={i}>
                  {currencies[key].name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Spacer />

        {/* Plans */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Planning
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Sales plan"
            name="salesPlan"
            margin="normal"
            multiline
            fullWidth
            value={this.props.salesPlan}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Marketing plan"
            name="marketingPlan"
            margin="normal"
            multiline
            fullWidth
            value={this.props.marketingPlan}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

      </Grid>
    );
  }
}

export default withStyles(styles)(Finances);
