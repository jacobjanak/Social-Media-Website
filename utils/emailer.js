const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jakeathotmail@gmail.com',
    pass: 'Qweasd8072'
  }
});

module.exports = transporter;
