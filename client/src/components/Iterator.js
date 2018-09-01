/*
  This component is used to standardize a system for the user to perform
  CRUD actions on an array, such as the team members of a business.
*/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  button: {
    position: 'absolute',
    top: 3 * theme.spacing.unit,
    right: 0,
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  display: {
    position: 'relative',
  },
  edit: {
    position: 'absolute',
    bottom: 12,
    right: 0,
  },
});

class Iterator extends Component {
  state = {
    newMarket: '',
  };

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.newMarket) {
      const { arr, updateArr } = this.props;
      arr.push(this.state.newMarket)
      this.setState({ newMarket: '' }, () => {
        updateArr(arr)
      })
    }
  };

  handleDelete = index => {
    const { arr, updateArr } = this.props;
    arr.splice(index, 1)
    updateArr(arr)
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes, arr, textFieldProps, InputComponent } = this.props;
    return (
      <React.Fragment>
        <form className={classes.root} onSubmit={this.handleSubmit}>
          {/* helperText={arr.length > 0 ? '' : "Press the enter key or click 'add' once you're done typing"}
          */}

          { InputComponent ? (
            <InputComponent
              name="newMarket"
              value={this.state.newMarket}
              onChange={this.handleChange}
            />
          ) : (
            <TextField
              name="newMarket"
              value={this.state.newMarket}
              margin="normal"
              fullWidth
              onChange={this.handleChange}
              {...textFieldProps}
            />
          )}
          <Button
            className={classes.button}
            variant="outlined"
            type="submit"
            size="small"
          >
            Add
          </Button>
        </form>
        <Grid container>
          { arr.map((el, i) => (
            <Chip
              className={classes.chip}
              label={el}
              key={el}
              onDelete={() => this.handleDelete(i)}
            />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Iterator);
