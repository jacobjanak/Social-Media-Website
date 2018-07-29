import React, { Component } from 'react';
import AuthService from './AuthService';

function withoutAuth(NoAuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    componentWillMount() {
      if (Auth.user()) {
        this.props.history.replace('/');
      }
    }

    render() {
      const { history } = this.props;
      return <NoAuthComponent history={history} />;
    }
  };
}

export default withoutAuth;
