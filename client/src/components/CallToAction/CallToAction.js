import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import './CallToAction.css';

class CallToAction extends Component {
  render() {
    return (
      <button className="raise">
        <Typography variant="subheading" color="inherit" component={Link} to="/signup">
          Sign Up Now
        </Typography>
      </button>
    );
  }
}

export default CallToAction;
