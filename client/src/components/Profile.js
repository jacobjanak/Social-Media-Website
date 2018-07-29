import React, { Component } from 'react';
import withAuth from './withAuth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    username: "",
    email: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id)
    .then(res => this.setState(res.data))
  }

  render() {
    return (
      <div className="container Profile">
        <h1>Profile</h1>
        <p>Name: {this.state.firstName + ' ' + this.state.lastName}</p>
        <p>Email: {this.state.email}</p>
        <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default withAuth(Profile);
