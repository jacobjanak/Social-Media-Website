import React, { Component } from 'react';
import API from '../API';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadedImage from './UploadedImage';
import Footer from './Footer';
import Spacer from './Spacer';

const styles = theme => ({
  paper: {
    paddingTop: 4 * theme.spacing.unit,
    paddingLeft: 8 * theme.spacing.unit,
    paddingRight: 8 * theme.spacing.unit,
    paddingBottom: 4 * theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 4 * theme.spacing.unit,
      paddingRight: 4 * theme.spacing.unit,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: '5%',
      paddingRight: '5%',
      borderRadius: 0,
    },
  },
  item: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
  itemImg: {
    cursor: 'pointer',
  },
  itemInfo: {
    flexGrow: 1,
    paddingLeft: 4 * theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      flexBasis: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: 2 * theme.spacing.unit,
      paddingLeft: 0,
      width: '100%',
      textAlign: 'center',
    },
  },
  loading: {
    marginTop: 8 * theme.spacing.unit,
  },
});

class Search extends Component {
  state = {
    users: false,
  };

  componentWillMount() {
    API.getUsers()
    .then(res => {
      const { users } = res.data;
      this.setState({ users })
    })
    .catch(res => alert("Error"))
  }

  render() {
    const { classes } = this.props;
    const { users } = this.state;

    if (!users) {
      return <CircularProgress className={classes.loading} />;
    }

    return (
      <React.Fragment>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={5}>
          <Paper className={classes.paper}>
            <Typography variant="display1" color="textPrimary" gutterBottom>
              Users
            </Typography>
            { users.map((user, i) => (
              <React.Fragment key={i}>
                <Divider />
                <Grid container className={classes.item} justify="center">
                  <Link to={'/profile/' + user.url}>
                    <UploadedImage
                      className={classes.itemImg}
                      img={user.img}
                      rounded
                    />
                  </Link>
                  <div className={classes.itemInfo}>
                    <Typography
                      variant="headline"
                      color="primary"
                      component={Link}
                      to={'/profile/' + user.url}
                      gutterBottom
                    >
                      {user.firstName + ' ' + user.lastName}
                    </Typography>
                    <Typography variant="body1">
                      {user.bio}
                    </Typography>
                  </div>
                </Grid>
              </React.Fragment>
            ))}
            <Spacer />
          </Paper>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Search);
