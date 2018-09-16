import React, { Component } from 'react';
import AuthService from './AuthService';
import API from '../API';
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
        .then(res => {
          if (window.location.pathname === '/profile/edit'
            || validateProfile(res.data)) {
            this.setState({ user: res.data })
          } else {
            this.props.history.replace('/profile/edit')
          }
        })
      } else {
        this.props.history.replace('/');
      }
    }

    render() {
      const { history, match } = this.props;
      const { user } = this.state;

      //NOTE: seems like this could replace all the state stuff?
      // const user = Auth.user();
      // if (user) {
      //   return <AuthComponent history={history} user={user} />;
      // } else {
      //   this.props.history.replace('/signup');
      //   return null;
      // }

      if (user) {
        return <AuthComponent history={history} match={match} user={user} {...props} />;
      } else {
        return null;
      }
    }
  };
}

export default withAuth;
