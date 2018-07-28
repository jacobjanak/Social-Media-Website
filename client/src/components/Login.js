import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.Auth.login(email, password)
      .then(res => {
        const { user } = res.data;
        this.props.history.replace(`/profile/${user._id}`)
      })
      .catch(err => alert(err.response.data.message))
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    return (
      <div className="container">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 mt-4">
          <form
            data-parsley-validate=""
            noValidate=""
            onSubmit={this.handleFormSubmit}
          >
             <div className="panel panel-default">
                <div className="panel-heading">
                   <div className="panel-title">Login</div>
                </div>
                <div className="panel-body">
                   <div className="form-group">
                      <label className="control-label">Email Address *</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        required
                        onChange={this.handleChange}
                      />
                   </div>
                   <div className="form-group">
                      <label className="control-label">Password *</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        required
                        onChange={this.handleChange}
                      />
                   </div>
                   <div className="required">* Required fields</div>
                </div>
                <div className="panel-footer">
                   <button type="submit" className="btn btn-primary">Login</button>
                   <Link to="/signup" className="ml-4">Don't have an account?</Link>
                </div>
             </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
