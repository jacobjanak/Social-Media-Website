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
import ContainedTextField from '../../ContainedTextField';
import Iterator from '../../Iterator';
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
    paddingBottom: 0,
  },
  listItem: {
    paddingBottom: 4 * theme.spacing.unit,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  group: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
});

class Finances extends Component {
  render() {
    const { classes, handleChange } = this.props;

    const CurrencySymbol = () => (
      <InputAdornment position="start">
        {currencies[this.props.currency].symbol}
      </InputAdornment>
    );

    return (
      <Grid container>


        {/* Sales plan */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Sales Plan
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.group}
              aria-label="Length of sales plan"
              name="salesPlanLength"
              value={this.props.salesPlanLength}
              onChange={handleChange}
            >
              <FormControlLabel
                value="3"
                label="3 year plan"
                control={<Radio />}
              />
              <FormControlLabel
                value="5"
                label="5 year plan"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <ContainedTextField
            placeholder="Description"
            name="salesPlan"
            rows="4"
            multiline
            fullWidth
            value={this.props.salesPlan}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Marketing plan */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Marketing Plan
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.group}
              aria-label="Length of marketing plan"
              name="marketingPlanLength"
              value={this.props.marketingPlanLength}
              onChange={handleChange}
            >
              <FormControlLabel
                value="3"
                label="3 year plan"
                control={<Radio />}
              />
              <FormControlLabel
                value="5"
                label="5 year plan"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <ContainedTextField
            placeholder="Description"
            name="marketingPlan"
            rows="4"
            multiline
            fullWidth
            value={this.props.marketingPlan}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

        {/* Revenue */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Revenue
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="currency">Currency</InputLabel>
            <Select
              value={this.props.currency}
              style={{
                width: '100%'
              }}
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
          <Iterator
            arr={this.props.streamsOfRevenue}
            textFieldProps={{ label: 'Streams of revenue' }}
            updateArr={streamsOfRevenue => {
              this.props.changeState({ streamsOfRevenue })
            }}
          />
        </Grid>
        <Spacer />

        {/* Streams of revenue
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Streams of Revenue
          </Typography>
        </Grid>

        {/*
        <Grid item xs={12}>
          <List className={classes.list}>
            {[1, 2, 3].map(i => (
              <ListItem className={classes.listItem} key={i}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name={'stream' + i}
                      value={this.props['stream' + i]}
                      margin="dense"
                      fullWidth
                      multiline
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {i + '.'}
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cost"
                      name={'streamCost' + i}
                      value={this.props['streamCost' + i] || ''}
                      margin="dense"
                      type="number"
                      fullWidth
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: <CurrencySymbol />
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Start"
                      type="date"
                      name={'startOfStream' + i}
                      value={this.props['startOfStream' + i] || ''}
                      margin="dense"
                      fullWidth
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>
        */}
        {/* <Spacer half /> using half since all list items have bottom padding */}

        {/* Expenses */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Business Costs
            <span style={{ display: 'inline', fontSize: '0.75em' }}>
              &nbsp;&nbsp;(monthly)
            </span>
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
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
              startAdornment={<CurrencySymbol />}
            />
          </FormControl>
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Finances);
