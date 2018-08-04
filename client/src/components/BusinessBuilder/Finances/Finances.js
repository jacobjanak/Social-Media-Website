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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Spacer from '../../Spacer';
import currencies from '../../../data/currencies.json';

const styles = theme => ({
  formControl: {
    // display: 'block',
    marginTop: 2 * theme.spacing.unit,
    width: '100%',
  },
  list: {
    paddingTop: 0.5 * theme.spacing.unit,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  }
});

class Finances extends Component {
  render() {
    const { classes, handleChange } = this.props;

    const currencySymbol = currencies[this.props.currency].symbol;

    return (
      <Grid container>

        {/* Forecast */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Forecast
          </Typography>
        </Grid>
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
        <Grid item xs={12}>
          <FormControl className={classes.formControl} component="fieldset">
            <FormLabel component="legend">Timeline</FormLabel>
            <RadioGroup
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

        {/* Streams of revenue */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Streams of Revenue
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.list}>
            {[1, 2, 3].map(i => (
              <ListItem className={classes.listItem} key={i}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name={'stream' + i}
                      value={this.props['stream' + i]}
                      fullWidth
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {i + '.'}
                          </InputAdornment>
                        ),
                        style: { paddingRight: 4 }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Start"
                      type="date"
                      name={'startOfStream' + i}
                      value={this.props['startOfStream' + i] || ''}
                      fullWidth
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="adornment-amount">
                        Cost
                      </InputLabel>
                      <Input
                        id="adornment-amount"
                        type="number"
                        name={'costOfStream' + i}
                        value={this.props['costOfStream' + i] || ''}
                        onChange={handleChange}
                        startAdornment={(
                          <InputAdornment position="start">{currencySymbol}</InputAdornment>
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Spacer />

        {/* Expenses */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Business Costs
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="rent">
              Rent
            </InputLabel>
            <Input
              id="rent"
              type="number"
              name="rent"
              value={this.props.rent}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="utilities">
              Utilities
            </InputLabel>
            <Input
              id="utilities"
              type="number"
              name="utilities"
              value={this.props.utilities}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="directCost">
              Direct cost
            </InputLabel>
            <Input
              id="directCost"
              type="number"
              name="directCost"
              value={this.props.directCost}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="personnel">
              Personnel
            </InputLabel>
            <Input
              id="personnel"
              type="number"
              name="personnel"
              value={this.props.personnel}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="expenses">
              Expenses
            </InputLabel>
            <Input
              id="expenses"
              type="number"
              name="expenses"
              value={this.props.expenses}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="assets">
              Assets
            </InputLabel>
            <Input
              id="assets"
              type="number"
              name="assets"
              value={this.props.assets}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="taxes">
              Taxes
            </InputLabel>
            <Input
              id="taxes"
              type="number"
              name="taxes"
              value={this.props.taxes}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="dividends">
              Dividends
            </InputLabel>
            <Input
              id="dividends"
              type="number"
              name="dividends"
              value={this.props.dividends}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="cashFlow">
              Cash flow
            </InputLabel>
            <Input
              id="cashFlow"
              type="number"
              name="cashFlow"
              value={this.props.cashFlow}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel htmlFor="financials">
              Financials
            </InputLabel>
            <Input
              id="financials"
              type="number"
              name="financials"
              value={this.props.financials}
              onChange={handleChange}
              startAdornment={(
                <InputAdornment position="start">{currencySymbol}</InputAdornment>
              )}
            />
          </FormControl>
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Finances);
