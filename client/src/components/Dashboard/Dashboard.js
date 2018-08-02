import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import './Dashboard.css';

const styles = theme => {
  console.log(theme)
  return ({
    paper: {
      padding: theme.spacing.unit * 2,
      width: '100%',
      height: 160,
      textAlign: 'center'
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
  })
};

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={11} md={10} lg={8}>
          <Typography variant="display1" color="primary" gutterBottom>
            My Businesses
          </Typography>
          <Grid container justify="center" >
            {[0,0,0].map((el, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Button
                  className="paper-button"
                  component={Link}
                  to="/business-builder"
                  fullWidth
                >
                  <Paper className={classes.paper} elevation={12}>
                    <Grid className={classes.center} container>
                      <AddCircle className={classes.icon} />
                    </Grid>
                  </Paper>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard);
