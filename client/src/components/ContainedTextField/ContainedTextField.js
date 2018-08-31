import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './ContainedTextField.css';

const styles = theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: 4,
    paddingTop: theme.spacing.unit,
    paddingLeft: 2 * theme.spacing.unit,
  },
});

class ContainedTextField extends Component {
  render() {
    const { classes } = this.props;

    return (
      <TextField
        className={classes.root + ' contained-text-field'}
        multiline
        rows={this.props.rows || 8}
        {...this.props}
        style={{
          paddingRight: this.props.rows ? 0 : 'inherit',
        }}
      />
    );
  }
}

export default withStyles(styles)(ContainedTextField);
