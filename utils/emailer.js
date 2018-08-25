const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const db = require('../models');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jakeathotmail@gmail.com',
    pass: 'Qweasd8072'
  }
});

const emailer = {
  confirmEmail: user => {
    return new Promise((resolve, reject) => {
      db.Confirm.create({ user: user._id })
      .then(confirm => {
        const pathToHTML = path.join(__dirname, '../emails/welcome.html');
        fs.readFile(pathToHTML, (err, data) => {
          if (err) reject({ err: err });

          const confirmUrl = `https://innovationscity.herokuapp.com/confirm?key=${confirm.key}`;
          const result = data
            .toString()
            .replace(/{{name}}/g, user.firstName || '')
            .replace(/{{action_url}}/g, confirmUrl);

          const options = {
            to: user.email,
            subject: 'Confirm Your Email',
            html: result
          };

          transporter.sendMail(options, (err, info) => {
            if (!err) {
              resolve()
            } else {
              reject({ message: "Unable to send emails to that email address." })
            }
          })
        })
      })
      .catch(err => reject({ err: err }))
    })
  },

  resetPassword: () => {

  },
}

module.exports = emailer;
