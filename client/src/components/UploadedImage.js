/*
  A user-uploaded image can be any size or ratio. This component preserves
  their ratio and normalizes them, cutting off parts as necessary.
*/

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    const { classes, img, alt, large, small, fill } = this.props;

    const containerStyles = {};
    if (large) {
      containerStyles.height = 200;
      containerStyles.width = 200;
    }
    else if (small) {
      containerStyles.height = 80;
      containerStyles.width = 80;
    }
    else if (fill) {
      containerStyles.position = 'relative';
      containerStyles.height = 0;
      containerStyles.width = '100%';
      containerStyles.paddingTop = '100%';
    }

    return (
      <div
        className={classes.container}
        style={containerStyles}
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
      </div>
    );
  }
}

export default withStyles(styles)(UploadedImage)
