import React, { Component } from 'react';

class Profile extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container Profile">
        <h1>Profile</h1>
        <p>Name: {user.firstName + ' ' + user.lastName}</p>
        <p>Email: {user.email}</p>
      </div>
    )
  }
}

export default Profile;
