import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Alert extends Component {
  render() {
    const { open, message, closeAlert } = this.props;

    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message={<span id="alert-message">{message}</span>}
          ContentProps={{ 'aria-describedby': 'alert-message' }}
          onClose={closeAlert}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={closeAlert}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default Alert;
