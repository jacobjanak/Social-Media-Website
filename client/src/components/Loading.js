import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    marginTop: 8 * theme.spacing.unit,
  },
});

const Loading = props => (
  <CircularProgress className={props.classes.root} />
);

export default withStyles(styles)(Loading);
