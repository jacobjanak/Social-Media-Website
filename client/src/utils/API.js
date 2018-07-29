import axios from 'axios';

const API = {
  getUser: id => axios.get(`/api/user/${id}`),

  signUpUser: (email, password, firstName, lastName) => {
    return axios.post('api/signup', {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });
  }
};

export default API;
