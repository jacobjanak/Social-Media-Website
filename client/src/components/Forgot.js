import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from './Alert';
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

  closeAlert = () => this.setState({ open: false });

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
        <Alert
          message="Email sent! Check your inbox"
          open={this.state.open}
          closeAlert={this.closeAlert}
        />
        <Hidden xsDown>
          <Spacer />
        </Hidden>
        <Card>
          <CardContent>
            <Typography variant="headline">
              Recover password
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
              Send password reset info
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Forgot);
