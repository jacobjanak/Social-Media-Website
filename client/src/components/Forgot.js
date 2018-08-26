import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/API';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Spacer from './Spacer';

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Forgot extends Component {
  state = {
    email: '',
    open: false,
  };

  toggleSnackbar = () => {
    this.setState({ open: !this.state.open })
  };

  handleSubmit = () => {
    API.resetPassword(this.state.email)
    .then(res => this.setState({ open: true }))
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.toggleSnackbar}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={(
            <span id="message-id">Email sent! Check your inbox</span>
          )}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.toggleSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Hidden xsDown>
          <Spacer />
        </Hidden>
        <Card>
          <CardContent>
            <Typography variant="headline">
              Reset password
            </Typography>
            <TextField
              label="Your email"
              name="email"
              margin="normal"
              fullWidth
              value={this.state.email}
              onChange={this.handleChange}
            />
          </CardContent>
          <CardContent>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={this.handleSubmit}
            >
              Send recovery info
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Forgot);
