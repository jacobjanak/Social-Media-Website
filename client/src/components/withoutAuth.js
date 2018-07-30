import React, { Component } from 'react';
import AuthService from './AuthService';

function withoutAuth(NoAuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    componentWillMount() {
      const user = Auth.user();
      if (user) {
        this.props.history.replace('/profile/' + user.id);
      }
    }

    render() {
      const { history } = this.props;
      return <NoAuthComponent history={history} />;
    }
  };
}

export default withoutAuth;
