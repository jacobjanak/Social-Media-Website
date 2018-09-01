import React, { Component } from 'react';
import AuthService from './AuthService';
import API from '../utils/API';

class Profile extends Component {
  constructor() {
    super()

    const path = window.location.pathname;
    const key = path.substring(path.lastIndexOf('/') + 1);

    this.Auth = new AuthService();
    this.state = {
      key,
      user: false,
      isOwner: false,
    };
  }

  componentDidMount() {
    // get user from db
    API.getUser(this.state.key)
    .then(res => {
      const user = res.data;
      this.setState(state => {
        // check if they're the owner so they can edit this profile
        if (user._id === this.Auth.user().id) {
          state.isOwner = true;
        }
        state.user = user;
        return state;
      })
    })
  }

  render() {
    const { user } = this.state;

    return (
      <div className="container Profile">
        <h1>Profile</h1>
        <p>Name: {user.firstName + ' ' + user.lastName}</p>
      </div>
    )
  }
}

export default Profile;
