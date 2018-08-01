import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'block',
    height: 8 * theme.spacing.unit,
    width: '100%',
    backgroundColor: 'transparent'
  },
  half: {
    height: 4 * theme.spacing.unit
  }
});

const Spacer = props =>  props.half ? (
  <div className={(
      props.classes.root + ' ' + props.classes.half
  )}></div>
) : (
  <div className={props.classes.root}></div>
);

export default withStyles(styles)(Spacer);
