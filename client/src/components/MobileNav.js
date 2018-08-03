import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import FontAwesome from 'react-fontawesome';

const styles = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
};

class MobileNav extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root} elevation={12}>
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Dashboard" value="dashboard" icon={(
            <FontAwesome name="tachometer" size="2x" style={{ marginBottom: 4 }} />
          )} />
          <BottomNavigationAction label="Account" value="account" icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default withStyles(styles)(MobileNav);
