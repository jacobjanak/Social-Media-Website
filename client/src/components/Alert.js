import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class Alert extends React.Component {
  render() {
    const { open, message, toggle } = this.props;

    return (
      <div>
        <Snackbar
          open={open}
          onClose={toggle}
          onClick={toggle}
          ContentProps={{ 'aria-describedby': 'alert-message' }}
          message={<span id="alert-message">{message}</span>}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        />
      </div>
    );
  }
}

export default Alert;
