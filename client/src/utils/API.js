import axios from 'axios';

const API = {
  createBusiness: business => axios.post('/api/business', business),
  getBusinesses: userID => axios.post('/api/user/businesses', { userID })
};

export default API;
