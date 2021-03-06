import decode from 'jwt-decode';
import axios from 'axios';

class AuthService {
  user = () => {
    const token = localStorage.getItem('id_token');
    return token ? decode(token) : false;
  };

  //NOTE: I will impliment expiring tokens later
  // isTokenExpired = token => {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   catch (err) {
  //     return false;
  //   }
  // };

  signUp = user => {
    return new Promise((resolve, reject) => {
      axios.post('user/signup', {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })
      // .then(() => this.login(email, password))
      .then(user => resolve(user))
      .catch(err => reject(err))
    })
  };

  login = (email, password) => {
    return new Promise((resolve, reject) => {
      // get token
      axios.post('user/login', {
        email: email,
        password: password
      })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem('id_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        resolve(res.data.user)
      })
      .catch(err => reject(err))
    })
  };

  logout = () => {
    // clear user token and profile data from localStorage
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('id_token');
  };
}

export default AuthService;
