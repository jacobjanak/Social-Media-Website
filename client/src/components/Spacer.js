import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'block',
    height: 5 * theme.spacing.unit,
    width: '100%',
    backgroundColor: 'transparent'
  }
});

const Spacer = props => (
  <div className={props.classes.root}></div>
);

export default withStyles(styles)(Spacer);
