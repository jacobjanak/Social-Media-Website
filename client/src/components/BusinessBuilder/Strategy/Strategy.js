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

});

class Strategy extends Component {
  render() {
    const { classes, handleChange } = this.props;

    return (
      <Grid container>

        {/* Impact */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Impact / Why
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 4 }}>
          <TextField
            name="impact"
            margin="dense"
            placeholder="blah blah blah"
            fullWidth
            multiline
            value={this.props.impact}
            onChange={handleChange}
            style={{ marginBottom: 0 }}
          />
        </Grid>
        <Spacer />

        {/* Exit strategy */}
        <Grid item xs={12}>
          <Typography variant="headline">
            Exit Strategy
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 4 }}>
          <TextField
            name="exitStrategy"
            margin="dense"
            placeholder="blah blah blah"
            fullWidth
            multiline
            value={this.props.exitStrategy}
            onChange={handleChange}
          />
        </Grid>
        <Spacer />

      </Grid>
    );
  }
}

export default withStyles(styles)(Strategy);
