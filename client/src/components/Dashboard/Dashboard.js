import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import API from '../../utils/API';
import Spacer from '../Spacer';
import './Dashboard.css';

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

class Dashboard extends Component {
  state = {
    businesses: []
  };

  componentDidMount() {
    const { user } = this.props;
    API.getBusinesses(user.id)
    .then(res => {
      const businesses = res.data;
      this.setState({ businesses: businesses })
    })
    .catch(err => console.log(err))
  }

  editBusiness = id => {
    const business = this.state.businesses[id];
    this.props.changeBusiness(business)
    this.props.history.push('/business-builder/1')
  }

  render() {
    const { classes } = this.props;
    const { businesses } = this.state;

    return (
      <Grid container justify="center">
        <Spacer half />
        <Grid item xs={12} sm={11} md={10} lg={8}>
          <Typography variant="display1" color="primary" align="center" gutterBottom>
            My Businesses
          </Typography>
          <Grid container justify="center" >

            {businesses.map((business, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Button
                  className={'paper-button ' + classes.button}
                  fullWidth
                  onClick={() => this.editBusiness(i)}
                >
                  <Paper className={classes.paper}>
                    <img
                      src={'/uploads/' + business.logo}
                      alt="logo"
                      style={{
                        height: 60,
                        width: 60,
                      }}
                    />
                    <Typography variant="subheading">
                      {business.name}
                    </Typography>
                  </Paper>
                </Button>
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <Button
                className={'paper-button ' + classes.button}
                component={Link}
                to="/business-builder"
                fullWidth
              >
                <Paper className={classes.paper}>
                  <Grid className={classes.center} container>
                    <AddCircle className={classes.icon} />
                  </Grid>
                </Paper>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard);
