import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  
});

class BusinessBuilder extends Component {
  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { classes } = this.props;

    return (

    );
  }
}

export default withStyles(styles)(BusinessBuilder);
