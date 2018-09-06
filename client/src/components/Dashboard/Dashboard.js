import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import API from '../../utils/API';
import UploadedImage from '../UploadedImage'
import Footer from '../Footer'
import Spacer from '../Spacer';
import './Dashboard.css';

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
  businessContainer: {
    // neutralizing the padding from paper
    marginLeft: -(4 * theme.spacing.unit),
    marginRight: -(4 * theme.spacing.unit),
    width: `calc(100% + ${8 * theme.spacing.unit}px)`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
    },
  },
  business: {
    margin: 4 * theme.spacing.unit,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '20%',
      marginRight: '20%',
    },
  },
  businessInfo: {
    height: 80,
    paddingLeft: 2 * theme.spacing.unit,
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  noBusiness: {

  },
  grow: {
    flexGrow: 1,
  },
  title: {
    // paddingLeft: 4 * theme.spacing.unit,
    // paddingRight: 4 * theme.spacing.unit,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Dashboard extends Component {
  state = {
    businesses: []
  };

  componentDidMount() {
    const { user } = this.props;
    API.getBusinesses()
    .then(res => this.setState({ businesses: res.data }))
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    const { businesses } = this.state;

    return (
      <React.Fragment>
        <Grid item xs={12} sm={10} md={7} lg={5} xl={4}>
          <Paper className={classes.paper}>
            <Grid container className={classes.title}>
              <Typography
                className={classes.grow}
                variant="display1"
                color="primary"
                gutterBottom
              >
                My Businesses
              </Typography>
              { businesses.length > 0 && (
                <Hidden xsDown>
                  {/* div is here so the height of button is good */}
                  <div>
                    <Button
                      variant="outlined"
                      component={Link}
                      to="/business-builder"
                    >
                      <AddCircle
                        className={classes.leftIcon}
                        style={{ fontSize: 18 }}
                      />
                      New business
                    </Button>
                  </div>
                </Hidden>
              )}
            </Grid>
            <Grid className={classes.businessContainer} container>
              { businesses.length > 0 ? (
                <React.Fragment>
                  { businesses.map((business, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Paper className={classes.business}>
                        <UploadedImage img={business.logo} fill />
                        <Grid container className={classes.businessInfo}>
                          <Typography
                            className={classes.grow}
                            variant={
                              business.name.length > 12
                              ? 'subheading'
                              : 'headline'
                            }
                          >
                            { business.name }
                          </Typography>
                          <IconButton
                            color="primary"
                            aria-label="Edit"
                            onClick={() => this.props.history.push('/business/edit/' + business.url)}
                          >
                            <EditIcon className={classes.icon} />
                          </IconButton>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </React.Fragment>
              ) : (
                <Grid className={classes.noBusiness} item xs={12}>
                  <Spacer half />
                  <Typography variant="headline" align="center" gutterBottom>
                    No business yet
                  </Typography>
                  <Spacer half />
                  <Grid container justify="center">
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/entrepreneur"
                    >
                      <AddIcon className={classes.leftIcon} />
                      Create yours now
                    </Button>
                  </Grid>
                  <Hidden smUp>
                    <Spacer />
                  </Hidden>
                </Grid>
              )}
            </Grid>
            { businesses.length > 0 && (
              <Hidden smUp>
                <Spacer half />
                <Grid container align="center">
                  <Grid item xs={12}>
                    <Button
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/business-builder/1"
                    >
                      Create new business
                    </Button>
                  </Grid>
                </Grid>
                <Spacer />
              </Hidden>
            )}
          </Paper>
        </Grid>
        <Hidden xsDown>
          <Spacer />
          <Spacer />
        </Hidden>
        <Footer />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Dashboard);
