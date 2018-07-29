import decode from 'jwt-decode';
import axios from 'axios';

class AuthService {
  getToken = () => localStorage.getItem('id_token');

  getProfile = () => decode(this.getToken());

  isLoggedIn = () => {
    const token = this.getToken();
    return Boolean(token) && !this.isTokenExpired(token)
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    }
    catch (err) {
      return false;
    }
  };

  setToken = idToken => {
    // saves user token to localStorage
    axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
    localStorage.setItem('id_token', idToken);
  };

  login = (email, password) => {
    // get token
    return axios.post('api/login', {
      email: email,
      password: password
    })
    .then(res => {
      this.setToken(res.data.token);
      return res;
    })
  };

  logout = () => {
    // clear user token and profile data from localStorage
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('id_token');
  };
}

export default AuthService;
