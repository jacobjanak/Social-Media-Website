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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Spacer from '../../Spacer';

const styles = theme => ({
  formControl: {
    display: 'block',
    marginTop: 2 * theme.spacing.unit
  }
});

class Timeline extends Component {
  render() {
    const { classes, handleChange } = this.props;

    return (
      <Grid container>

        {/* Plans */}
        {/* <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Planning
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            label="Website"
            name="website"
            margin="normal"
            fullWidth
            value={this.props.website}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Timeline);
