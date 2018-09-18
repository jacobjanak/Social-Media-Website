import React, { Component } from 'react';
import AuthService from './AuthService';
import API from '../API';
import IncompleteProfile from './IncompleteProfile';
import validateProfile from '../utils/validateProfile';

function withAuth(AuthComponent, props) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      user: false
    };

    componentWillMount() {
      const user = Auth.user();

      if (user) {
        API.getUser(user.id)
        .then(res => this.setState({ user: res.data }))
      } else {
        this.props.history.replace('/');
      }
    }

    render() {
      const { history, match } = this.props;
      const { user } = this.state;

      const errors = validateProfile(user);

      if (!user) {
        return null;
      }
      if (window.location.pathname !== '/profile/edit' && errors.length > 0) {
        return <IncompleteProfile />
      }
      else {
        return <AuthComponent history={history} match={match} user={user} {...props} />;
      }
    }
  };
}

export default withAuth;
