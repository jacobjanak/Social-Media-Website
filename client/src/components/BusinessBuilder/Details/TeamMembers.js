import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    width: '100%',
    height: 160,
    textAlign: 'center'
  },
  button: {
    padding: theme.spacing.unit * 2,
    textTransform: 'none'
  },
  icon: {
    color: theme.palette.text.secondary,
    fontSize: 48
  },
  center: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class TeamMembers extends Component {
  state = {
    value: [],
    open: false,
    firstName: '',
    lastName: '',
    title: '',
    education: '',
    email: '',
    bio: ''
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    console.log('hi')
    this.setState({ open: false })
  };

  handleSubmit = () => {
    this.props.addTeamMember({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      title: this.state.title,
      education: this.state.education,
      email: this.state.email,
      bio: this.state.bio
    })
    this.handleClose()
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes, team } = this.props;
    const { open } = this.state;

    return (
      <Grid container>
        { team.map((teamMember, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Button
              className={'paper-button ' + classes.button}
              fullWidth
              onClick={this.handleOpen}
            >
              <Paper className={classes.paper}>
                <Grid style={{ textAlign: 'left' }} container>
                  <div>
                    <Typography variant="subheading">
                      {teamMember.firstName} {teamMember.lastName}
                    </Typography>
                    <Typography variant="body1">
                      {teamMember.title}
                    </Typography>
                  </div>
                </Grid>
              </Paper>
            </Button>
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={4}>
          <Button
            className={'paper-button ' + classes.button}
            fullWidth
            onClick={this.handleOpen}
          >
            <Paper className={classes.paper}>
              <Grid className={classes.center} container>
                <div>
                  <PersonAddIcon className={classes.icon} />
                  <Typography variant="body1">
                    Add team members
                  </Typography>
                </div>
              </Grid>
            </Paper>
          </Button>
        </Grid>

        {/* Popup */}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="sm"
          aria-labelledby="add-team-title"
          scroll="body"
          open={open}
          value={this.state.value}
          onClose={this.handleClose}
        >
          <DialogTitle id="add-team-title">Add Team Member</DialogTitle>
          <DialogContent> {/* name, email, title, bio, education, img */}
            <Grid container>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First name"
                  name="firstName"
                  margin="normal"
                  fullWidth
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  name="lastName"
                  margin="normal"
                  fullWidth
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <TextField
                label="Email"
                name="email"
                margin="normal"
                fullWidth
                value={this.state.email}
                onChange={this.handleChange}
              />
              <TextField
                label="Title"
                name="title"
                margin="normal"
                fullWidth
                value={this.state.title}
                onChange={this.handleChange}
              />
              <TextField
                label="Education"
                name="education"
                margin="normal"
                fullWidth
                multiline
                value={this.state.education}
                onChange={this.handleChange}
              />
              <TextField
                label="Bio"
                name="bio"
                margin="normal"
                fullWidth
                multiline
                value={this.state.bio}
                onChange={this.handleChange}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

      </Grid>
    );
  }
}

export default withStyles(styles)(TeamMembers);
