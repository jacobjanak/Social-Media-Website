import React, { Component } from 'react';
import AuthService from './AuthService';

function withoutAuth(NoAuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    componentWillMount() {
      if (Auth.isLoggedIn()) {
        this.props.history.replace('/');
      }
    }

    render() {
      return <NoAuthComponent history={this.props.history} />;
    }
  };
}

export default withoutAuth;
