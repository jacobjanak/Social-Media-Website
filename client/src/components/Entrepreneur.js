import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Spacer from './Spacer';
import './Temp.css';

// data
import educationLevels from '../data/educationLevels';
import ethnicities from '../data/ethnicities';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit,
    paddingRight: 8 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      borderRadius: 0,
    },
  },
  formControl: {
    width: '100%',
  },
  flex: {
    flexDirection: 'row-reverse',
  },
  names: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  avatar: {
    marginLeft: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      margin: 'auto'
    },
  },
  previewContainer: {
    width: 200,
    height: 200,
    marginBottom: 2 * theme.spacing.unit,
    overflow: 'hidden',
  },
  preview: {
    minWidth: '100%',
    minHeight: '100%',
    width: '100%',
    margin: '50% 0 0 50%',
    transform: 'translate(-50%, -50%)',
  },
});

class Entrepreneur extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      birthday: '',
      interests: '',
      education: '',
      ethnicity: '',
      picture: '',
      picturePreview: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('hi')
  };

  handleUpload = event => {
    const { name, files } = event.target;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        picture: files[0],
        picturePreview: reader.result
      });
    }
    reader.readAsDataURL(files[0])
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;
    const { picturePreview } = this.state;

    const profilePic = `url(${this.state.picturePreview || '/img/user/default.jpg'})`;

    return (
      <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
        <Hidden xsDown>
          <Spacer half />
        </Hidden>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="display1" align="center" color="primary">
                  Entrepreneur Signup
                </Typography>
              </Grid>
              <Spacer half={true} />

              {/* <Grid item xs={12}>
                <div className={classes.previewContainer}>
                  <img
                    className={classes.preview}
                    src={this.state.picturePreview || '/img/user/default.jpg'}
                    alt="logo"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  name="logo"
                  accept=".png, .jpg, .jpeg"
                  onChange={this.handleUpload}
                />
              </Grid> */}

              {/* Picture */}
              <Grid container className={classes.flex}>
                <div className={classes.avatar + ' avatar-upload'}>
                  <div className="avatar-edit">
                    <input
                      id="imageUpload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={this.handleUpload}
                    />
                    <label htmlFor="imageUpload"></label>
                  </div>
                  <div className="avatar-preview">
                    <div style={{ backgroundImage: profilePic }}></div>
                  </div>
                </div>

                {/* Name */}
                <div className={classes.names}>
                  <Grid item xs={12}>
                    <TextField
                      label="First name"
                      name="firstName"
                      margin="normal"
                      fullWidth
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last name"
                      name="lastName"
                      margin="normal"
                      fullWidth
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </div>
              </Grid>
              <Spacer half />

              {/* Birthday */}
              <Grid item xs={12}>
                <TextField
                  label="Birthday"
                  name="birthday"
                  type="date"
                  value={this.state.birthday}
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: '100%' }}
                />
              </Grid>
              <Spacer half />

              {/* google maps api auto complete */}

              {/* Education */}
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="education">Education</InputLabel>
                  <Select
                    value={this.state.education}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'education',
                      id: 'education',
                    }}
                  >
                    {educationLevels.map((level, i) => (
                      <MenuItem value={level} key={i}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Spacer half />

              {/* Interests */}
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="interests">Interests</InputLabel>
                  <Select
                    value={this.state.interests}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'interests',
                      id: 'interests',
                    }}
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Spacer half />

              {/* Ethnicity */}
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="ethnicity">Race or ethnicity</InputLabel>
                  <Select
                    value={this.state.ethnicity}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'ethnicity',
                      id: 'ethnicity',
                    }}
                  >
                    {ethnicities.map((ethnicity, i) => (
                      <MenuItem value={ethnicity} key={i}>
                        {ethnicity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Spacer half />

              {/* Gender */}
              <Grid item xs={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    className={classes.group}
                    aria-label="Gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Submit button */}
              <Grid container justify="flex-end">
                <Button
                  className={classes.submit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>

            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Entrepreneur);
