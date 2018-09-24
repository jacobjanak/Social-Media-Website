import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Spacer from './Spacer';

const styles = theme => ({
  root: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    width: '100%',
    backgroundColor: '#263238',
    color: theme.palette.text.light,
  },
  headline: {
    color: 'white'
  },
  email: {
    marginTop: 4 * theme.spacing.unit,
    marginRight: 2 * theme.spacing.unit,
    width: 240,
    borderBottom: '1px solid rgba(255, 255, 255, 1)',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: 4 * theme.spacing.unit,
      width: '100%',
    },
  },
  input: {
    color: 'white',
  },
  submit: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
});

class Subscribe extends Component {
  state = {
    email: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  handleSubmit = event => {
    event.preventDefault()
    alert('Newsletter is not available yet')
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Spacer />
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography
              className={classes.headline}
              variant="display1"
              align="center"
            >
              Subscribe to our newsletter
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <TextField
              className={classes.email}
              label={(<span style={{ color: 'white' }}>Your email</span>)}
              name="email"
              value={this.state.email}
              InputProps={{
                className: classes.input,
                disableUnderline: true,
              }}
              onChange={this.handleChange}
            />
            <Button
              className={classes.submit}
              variant="contained"
              color="primary"
              type="submit"
              style={{ cursor: 'not-allowed' }}
            >
              Subscribe
            </Button>
          </form>
        </Grid>
        <Spacer />
      </div>
    );
  }
}

export default withStyles(styles)(Subscribe);
