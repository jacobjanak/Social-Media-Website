/*
  A user-uploaded image can be any size or ratio. This component preserves
  their ratio and normalizes them, cutting off parts as necessary.
*/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    overflow: 'hidden',
  },
  img: {
    minWidth: '100%',
    minHeight: '100%',
    width: '100%',
    margin: '50% 0 0 50%',
    transform: 'translate(-50%, -50%)',
  },
});

class UploadedImage extends Component {
  render() {
    const { classes, img, alt, large, fill, rounded, border } = this.props;

    const styles = {
      height: large ? 160 : 112,
      width: large ? 160 : 112,
      border: border ? '6px solid white' : 'none',
    };

    if (rounded) {
      styles.borderRadius = '100%';
    }

    if (fill) {
      styles.position = 'relative';
      styles.height = 0;
      styles.width = '100%';
      styles.paddingTop = '100%';
    }

    return (
      <Paper
        className={classes.container}
        elevation={border ? 8 : 0}
        style={styles}
      >
        <img
          className={classes.img}
          src={img}
          alt={alt || "user uploaded image"}
          style={fill && ({
            position: 'absolute',
            top: 0,
            left: 0,
          })}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(UploadedImage)
