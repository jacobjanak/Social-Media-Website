import axios from 'axios';

const API = {
  getUser: id => axios.get(`/api/user/${id}`),

  signUpUser: (username, email, password) => {
    return axios.post('api/signup', {
      username: username,
      email: email, password: password
    });
  }
};

export default API;
