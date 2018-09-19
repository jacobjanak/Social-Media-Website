import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    width: '100%',
  },
})

class DropDown extends Component {
  render() {
    const { classes, label, name, value, options } = this.props;

    return (
      <FormControl className={classes.root} margin="dense">
        <InputLabel htmlFor={name} shrink>
          { label + (this.props.required ? ' *' : '') }
        </InputLabel>
        <Select
          native
          required={this.props.required}
          value={value}
          onChange={this.props.handleChange}
          inputProps={{
            name: name,
            id: name,
          }}
        >
          {this.props.required && (
            <option value="" disabled>None</option>
          )}
          {options.map((el, i) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(DropDown);
