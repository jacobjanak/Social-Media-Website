import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import './ContainedTextField.css';

const styles = theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: 4,
    paddingTop: theme.spacing.unit,
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class ContainedTextField extends Component {
  state = {
    focused: false,
  };

  onBlur = () => this.setState({ focused: false });
  onFocus = () => this.setState({ focused: true });

  render() {
    const { classes, labelProps, rows } = this.props;
    const { focused } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography
            className={focused ? 'primaryDark' : ''}
            variant="subheading"
            color="textSecondary"
            {...labelProps}
          >
            { this.props.label }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.root + ' contained-text-field'}
            multiline
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...this.props}
            label=""
            style={{ paddingRight: rows ? 'inherit' : 0 }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ContainedTextField);
