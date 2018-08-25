import axios from 'axios';

const API = {
  getUser: user => axios.get('/user/' + (user || '')),

  editUser: user => {
    // all this formData stuff is necessary for images
    const formData = new FormData();
    for (let key in user) {
      formData.append(key, user[key]);
    }

    return axios.post('/user/edit', formData, {
      'Content-Type': 'multipart/form-data'
    })
  },

  createBusiness: business => {
    // all this formData stuff is necessary for images
    const formData = new FormData();
    for (let key in business) {
      formData.append(key, business[key]);
    }

    return axios.post('/business/create', formData, {
      'Content-Type': 'multipart/form-data'
    })
  },

  getBusinesses: userID => axios.post('/business/get', { userID }),

  resetPassword: email => axios.post('/email/reset-password', { email }),

  changePassword: (password, key) => {
    return axios.post('/user/edit/password', { password, key });
  }
};

export default API;
