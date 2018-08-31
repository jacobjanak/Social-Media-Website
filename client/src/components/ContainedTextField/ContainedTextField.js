import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './ContainedTextField.css';

const styles = theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
  },
});

class ContainedTextField extends Component {
  render() {
    const { classes } = this.props;

    return (
      <TextField
        className={classes.root + ' large-text-field'}
        multiline
        rows="4"
        {...this.props}
      />
    );
  }
}

export default withStyles(styles)(ContainedTextField);
