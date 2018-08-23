import axios from 'axios';

const API = {
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

  getBusinesses: userID => axios.post('business/api/user/businesses', { userID })
};

export default API;
