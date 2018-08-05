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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Social from './Social';
import Spacer from '../../Spacer';

const styles = theme => ({
  formControl: {
    display: 'block',
    marginTop: 2 * theme.spacing.unit,
  },
  list: {
    paddingTop: 0.5 * theme.spacing.unit,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  }
});

class Timeline extends Component {
  render() {
    const { classes, handleChange } = this.props;

    return (
      <Grid container>

        {/* Plans */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Temp
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Social />
        </Grid>
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
        <Spacer />

        {/* Milestones */}
        <Grid item xs={12}>
          <Typography variant="headline" margin="normal">
            Milestones
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.list}>
            {[1, 2, 3].map(i => (
              <ListItem className={classes.listItem} key={i}>
                <Grid container>
                  <div style={{ flexGrow: 1 }}>
                    <TextField
                      label="Name"
                      name={'milestone' + i}
                      value={this.props['milestone' + i]}
                      fullWidth
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {i + '.'}
                          </InputAdornment>
                        ),
                        style: { paddingRight: 8 }
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      label="Due date"
                      type="date"
                      name={'milestoneDate' + i}
                      value={this.props['milestoneDate' + i] || ''}
                      className={classes.textField}
                      fullWidth
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>

      </Grid>
    );
  }
}

export default withStyles(styles)(Timeline);
