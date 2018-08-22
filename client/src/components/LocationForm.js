import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

// Google places API
import axios from 'axios';
const key = 'AIzaSyC-_mgd4Vs9X83tJlxKur1V8lmjhQCyh0I';

// holds a ref to the Component.autocomplete function
let autocomplete = () => {};

const styles = theme => ({
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing.unit,
  },
});

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const inputComponent = ({ inputRef, ...props }) => (
  <div ref={inputRef} {...props} />
);

const Control = props => (
  <TextField
    fullWidth
    onChange={autocomplete}
    InputProps={{
      inputComponent,
      inputProps: {
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children,
        ...props.innerProps,
      },
    }}
    {...props.selectProps.textFieldProps}
  />
);

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    component="div"
    style={{
      fontWeight: props.isSelected ? 500 : 400,
    }}
    {...props.innerProps}
  >
    {props.children}
  </MenuItem>
);

const Placeholder = props => (
  <Typography
    color="textSecondary"
    className={props.selectProps.classes.placeholder}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const SingleValue = props => (
  <Typography
    className={props.selectProps.classes.singleValue}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
);

const ValueContainer = props => (
  <div className={props.selectProps.classes.valueContainer}>
    {props.children}
  </div>
);

const Menu = props => (
  <Paper
    square
    className={props.selectProps.classes.paper}
    {...props.innerProps}
  >
    {props.children}
  </Paper>
);

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  ValueContainer,
  Menu,
};

class LocationForm extends Component {
  state = {
    predictions: [],
    street: '',
    zip: '',
    city: '',
    state: '',
    country: '',
  }

  componentDidMount() {
    autocomplete = this.autocomplete;
  }

  autocomplete = e => {
    const { value } = e.target;
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';

    axios.get(`https://cors-anywhere.herokuapp.com/${url}input=${value}&key=${key}`)
    .then(res => {
      const { predictions } = res.data;
      this.setState({ predictions })
    })
  };

  handleSelect = name => index => {
    const { predictions } = this.state;
    const placeId = predictions[index.value].place_id;

    const url = 'https://maps.googleapis.com/maps/api/place/details/json?';
    axios.get(`https://cors-anywhere.herokuapp.com/${url}placeid=${placeId}&key=${key}`)
    .then(res => {
      this.setState(state => {
        const data = res.data.result.address_components;
        data.forEach(el => {
          if (el.types.includes('street_number')) {
            state.street = el.long_name
          }
          else if (el.types.includes('route')) {
            state.street += ' ' + el.long_name;
          }
          else if (el.types.includes('locality')) {
            state.city = el.long_name;
          }
          else if (el.types.includes('administrative_area_level_1')) {
            state.state = el.long_name;
          }
          else if (el.types.includes('postal_code')) {
            state.zip = el.long_name;
          }
          else if (el.types.includes('country')) {
            state.country = el.long_name;
          }
        })

        return state;
      })
    })
  };

  render() {
    const { classes, theme } = this.props;
    const { predictions } = this.state;

    const options = predictions.map((prediction, i) => ({
      value: i,
      label: prediction.description
    }));

    const fields = [
      { value: 'street', label: 'Street address' },
      { value: 'city', label: 'City' },
      { value: 'zip', label: 'Zip code' },
      { value: 'state', label: 'State' },
      { value: 'country', label: 'Country' }
    ].reduce((map, field) => {
      map[field.value] = (
        <Select
          classes={classes}
          options={options}
          components={components}
          placeholder={field.label}
          onChange={this.handleSelect(field.value)}
          value={this.state[field.value]
            ? { label: this.state[field.value] }
            : ''
          }
        />
      );
      return map;
    }, {});

    return (
      <Grid container>
        <Grid item xs={12}>
          {fields.street}
        </Grid>
        <Grid item xs={12}>
          {fields.city}
        </Grid>
        <Grid item xs={12} sm={6}>
          {fields.state}
        </Grid>
        <Grid item xs={12} sm={6}>
          {fields.zip}
        </Grid>
        <Grid item xs={12}>
          {fields.country}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LocationForm);
