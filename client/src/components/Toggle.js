import React, { Component } from 'react';

class Toggle extends Component {
  render() {
    return (
      <React.Fragment>
        <input className="toggle hide" id="" type="checkbox"/>
        <label className="toggle" htmlFor="toggle">
          <span className="hide">Label Title</span>
        </label>
      </React.Fragment>
    );
  }
}

export default Toggle;
