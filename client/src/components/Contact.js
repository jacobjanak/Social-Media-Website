import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import API from '../API';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PlaceIcon from '@material-ui/icons/Place';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import Alert from './Alert';
import Footer from './Footer';
import Spacer from './Spacer';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  centerY: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2 * theme.spacing.unit,
  },
  info: {
    display: 'inline',
    marginLeft: 4 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 2 * theme.spacing.unit,
    },
  },
  icon: {
    fontSize: 32,
    color: theme.palette.primary.main,
  },
})

class Contact extends Component {
  state = {
    name: '',
    email: '',
    subject: '',
    message: '',
    open: false, // snackbar
  };

  closeAlert = () => this.setState({ open: false });

  handleSubmit = event => {
    event.preventDefault()
    API.contactUs({
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    })
    .then(() => {
      this.setState({
        name: '',
        email: '',
        subject: '',
        message: '',
        open: true,
      })
    })
    .catch(err => console.log(err))
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12} md={10} lg={8}>
          <Alert
            message="Message sent"
            open={this.state.open}
            closeAlert={this.closeAlert}
          />
          <Paper className={classes.paper}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="display1" align="center" color="primary">
                  Get in Touch
                </Typography>
              </Grid>
              <Hidden smDown>
                <Spacer half />
              </Hidden>
              <Grid item xs={12} md={6}>
                <Spacer half />
                <Grid container className={classes.centerY}>
                  <PlaceIcon className={classes.icon} />
                  <Typography className={classes.info} variant="subheading">
                    P.O. Box 33075 San Diego, CA 92163
                  </Typography>
                </Grid>
                <Grid container className={classes.centerY}>
                  <EmailIcon className={classes.icon} />
                  <Typography className={classes.info} variant="subheading">
                    info@innovationscity.com
                  </Typography>
                </Grid>
                <Grid container className={classes.centerY}>
                  <PhoneIcon className={classes.icon} />
                  <Typography className={classes.info} variant="subheading">
                    858.381.2505
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    label="Your name"
                    name="name"
                    margin="normal"
                    fullWidth
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    margin="normal"
                    fullWidth
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Subject"
                    name="subject"
                    margin="normal"
                    fullWidth
                    required
                    value={this.state.subject}
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    margin="normal"
                    fullWidth
                    required
                    multiline
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                  <Spacer half />
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Send message
                    </Button>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Hidden smDown>
          <Spacer />
        </Hidden>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Contact);
