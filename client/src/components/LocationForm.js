import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';

// for Google Places API
import axios from 'axios';
const CORS = 'https://cors-anywhere.herokuapp.com/';
const proxy = CORS;
const key = 'AIzaSyC-_mgd4Vs9X83tJlxKur1V8lmjhQCyh0I';

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      margin="dense"
      fullWidth
      required
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, i) => {
          return part.highlight ? (
            <span key={i} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={i} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
};

//NOTE: can we skip this function?
const getSuggestionValue = suggestion => suggestion;

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    marginBottom: 20,
  },
});

class LocationForm extends Component {
  state = {
    suggestions: [],
    focus: '', // keep track of which input has focus
  };

  popperNode = {};

  getPlaceData = placeId => {
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?';
    axios.get(`${proxy}${url}placeid=${placeId}&key=${key}`)
    .then(res => {
      // some prehistoric error handling
      if (!res.data) return;
      if (!res.data.result) return;
      if (!res.data.result.address_components) return;

      const data = res.data.result.address_components;
      const state = {};
      let streetNumber = '';
      let route = '';

      data.forEach(el => {
        if (el.types.includes('street_number')) {
          streetNumber = el.long_name;
        }
        else if (el.types.includes('route')) {
          route = el.long_name;
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

      state.street = streetNumber + (streetNumber ? ' ' : '') + route;
      this.props.changeState(state)
    })
  };

  autocompleteFetch = ({ value }) => {
    const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';

    axios.get(`${proxy}${url}input=${value}&key=${key}`)
    .then(res => {
      const suggestions = res.data.predictions.map(el => ({
        label: el.description,
        id: el.place_id
      }))
      this.setState({ suggestions })
    })
  };

  autocompleteClear = () => {
    this.setState({ suggestions: [] })
  };

  setFocus = name => {
    this.setState({ focus: name })
  };

  handleChange = name => (event, { newValue }) => {
    // runs when a letter is typed or option is clicked
    if (newValue.label) {
      this.props.changeState({ [name]: newValue.label }, () => { //NOTEL did it work?
        this.getPlaceData(newValue.id)
      })
    } else {
      this.props.changeState({ [name]: newValue })
    }
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.autocompleteFetch,
      onSuggestionsClearRequested: this.autocompleteClear,
      getSuggestionValue,
      renderSuggestion,
    };

    const fields = [
      { value: 'street', label: 'Street address' },
      { value: 'city', label: 'City' },
      { value: 'zip', label: 'Zip code' },
      { value: 'state', label: 'State' },
      { value: 'country', label: 'Country' }
    ].reduce((map, field) => {
      map[field.value] = (
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            label: field.label,
            value: this.props[field.value],
            type: field.value === 'zip' ? 'number' : 'text',
            onChange: this.handleChange(field.value),
            onFocus: () => this.setFocus(field.value),
            onBlur: () => this.setFocus(''),
            inputRef: node => this.popperNode[field.value] = node,
            InputLabelProps: {
              shrink: (
                Boolean(this.props[field.value])
                || this.state.focus === field.value
              ),
            },
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Popper
              anchorEl={this.popperNode[field.value]}
              open={Boolean(options.children)}
              placement="top-start"
            >
              <Paper
                square
                {...options.containerProps}
                style={{
                  width: this.popperNode[field.value]
                    ? this.popperNode[field.value].clientWidth
                    : null
                }}
              >
                {options.children}
              </Paper>
            </Popper>
          )}
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
          {fields.zip}
        </Grid>
        <Grid item xs={12}>
          {fields.city}
        </Grid>
        <Grid item xs={12}>
          {fields.state}
        </Grid>
        <Grid item xs={12}>
          {fields.country}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LocationForm);
