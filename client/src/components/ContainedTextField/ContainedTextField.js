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
    marginTop: 0,
    paddingTop: theme.spacing.unit,
    paddingLeft: 2 * theme.spacing.unit,
    paddingRight: 2 * theme.spacing.unit,
  },
});

class ContainedTextField extends Component {
  state = {
    focused: false,
  };

  onBlur = () => this.setState({ focused: false });
  onFocus = () => this.setState({ focused: true });

  render() {
    const { classes, labelProps, rows, maxCharacters, margin } = this.props;
    const { focused } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Typography
              className={focused ? 'primaryDark' : ''}
              variant="subheading"
              color="textSecondary"
              {...labelProps}
            >
              { this.props.label }
            </Typography>
            { maxCharacters && (
              <React.Fragment>
                <div style={{ flexGrow: 1 }}></div>
                <Typography
                  variant="subheading"
                  color="textSecondary"
                  {...labelProps}
                >
                  {this.props.value.length}/{maxCharacters} characters
                </Typography>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={classes.root + ' contained-text-field'}
            multiline
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...this.props}
            label=""
            InputProps={{ maxLength: maxCharacters }}
            style={{
              marginBottom: margin === 'normal' ? 8 : 4,
              paddingRight: rows ? 'inherit' : 0,
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ContainedTextField);
