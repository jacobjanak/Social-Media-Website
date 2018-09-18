import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'inline',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class LoadingButton extends Component {
  render() {
    const { classes, loading } = this.props;

    return (
      <div className={classes.root}>
        <Button disabled={loading} {...this.props}>
          { this.props.children }
        </Button>
        { loading && (
          <CircularProgress
            className={classes.progress}
            size={24}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(LoadingButton);
