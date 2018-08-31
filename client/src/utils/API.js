import axios from 'axios';

const toFormData = obj => {
  // all this formData stuff is necessary for images
  const formData = new FormData();
  for (let key in obj) {
    if (obj[key].constructor === Array) {
      formData.append(key, JSON.stringify(obj[key]))
    } else {
      formData.append(key, obj[key])
    }
  }
  return formData;
}

const API = {
  getUser: (user = '') => axios.get('/user/' + user),
  editUser: user => axios.post('/user/edit', toFormData(user), {
    'Content-Type': 'multipart/form-data',
  }),
  createBusiness: business => axios.post('/business/create', toFormData(business), {
    'Content-Type': 'multipart/form-data'
  }),
  editBusiness: business => axios.post('/business/edit', toFormData(business), {
    'Content-Type': 'multipart/form-data'
  }),
  getBusiness: key => axios.get('/business/' + key),
  getBusinesses: key => axios.get('/business/'),
  resendConfirmation: email => axios.post('/email/confirm', { email }),
  confirmEmail: key => axios.post('/user/confirm', { key }),
  resetPassword: email => axios.post('/email/reset-password', { email }),
  changePassword: (password, key) => axios.post('/user/edit/password', { password, key }),
  contactUs: data => axios.post('/email/contact-us', data),
};

export default API;
