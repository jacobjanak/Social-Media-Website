import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './AuthService';
import API from '../utils/API';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { email, username, password, confirmPassword } = this.state;

    console.log('FRIG')

    if (email && username && password && password === confirmPassword) {
      API.signUpUser(username, email, password)
      .then(res => this.props.history.replace('/login'))
      .catch(err => alert(err.response.data.message))
    }
  }

  handleCheck = event => {
    this.setState({ [event.target.name]: event.checked });
  }

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

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
                <div className="panel-title">Register</div>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="control-label">Email Address *</label>
                  <input
                    type="text"
                    name="email"
                    required
                    className="form-control"
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                  <label className="control-label">Username *</label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="form-control"
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                  <label className="control-label">Password *</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    onChange={this.handleChange}
                    />
                </div>
                <div className="form-group">
                  <label className="control-label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    data-parsley-equalto="#password"
                    className="form-control"
                    onChange={this.handleChange}
                    />
                </div>
                <div className="required">* Required fields</div>
              </div>
              <div className="panel-footer">
                <button type="submit" className="btn btn-primary">Register</button>
                <Link to="/login" className="ml-4">Already have an account?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
