import axios from 'axios';

const API = {
  createBusiness: business => {
    // all this formData stuff is necessary for images
    const formData = new FormData();
    for (let key in business) {
      formData.append(key, business[key]);
    }

    return axios.post('/api/business', formData, {
      'Content-Type': 'multipart/form-data'
    })
  },

  getBusinesses: userID => axios.post('/api/user/businesses', { userID })
};

export default API;
