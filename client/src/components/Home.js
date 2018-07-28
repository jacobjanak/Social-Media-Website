import React, { Component } from 'react';
import AuthService from './AuthService';

const Auth = new AuthService();

class Home extends Component {
  state = {
    userID: this.props.user.id,
    profileLink: ""
  };

  componentDidMount() {
    const profileLinkURL = `/profile/${this.state.userID}`;
    this.setState({ profileLink: profileLinkURL });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace(this.state.profileLink);
  };

  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <h2>Welcome {this.props.user.email}</h2>
        <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
        </p>
      </div>
    );
  }
}

export default Home;
