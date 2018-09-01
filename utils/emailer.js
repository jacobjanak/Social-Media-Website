const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const db = require('../models');

const transporter = nodemailer.createTransport({
  name: 'innovationscity.herokuapp.com',
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS
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
              reject({ message: "Unable to send emails to that email address" })
            }
          })
        })
      })
      .catch(err => reject({ err: err }))
    })
  },

  //NOTE: pretty lame that I just copy+pasted this
  resendConfirmEmail: user => {
    return new Promise((resolve, reject) => {
      db.Confirm.findOne({ user: user._id })
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
              resolve(user.email)
            } else {
              reject({ err: err, message: "Unable to send emails to that email address" })
            }
          })
        })
      })
    })
  },

  resetPassword: user => {
    return new Promise((resolve, reject) => {
      db.Reset.create({ user: user._id })
      .then(reset => {
        const pathToHTML = path.join(__dirname, '../emails/password_reset.html');
        fs.readFile(pathToHTML, (err, data) => {
          const resetUrl = `https://innovationscity.herokuapp.com/reset?key=${reset.key}`;

          const result = data
            .toString()
            .replace(/{{name}}/g, user.firstName || '')
            .replace(/{{action_url}}/g, resetUrl);

          const options = {
            to: user.email,
            subject: 'Reset Your Password',
            html: result
          };

          transporter.sendMail(options, (err, info) => {
            if (!err) {
              resolve(user.email)
            } else {
              reject({ err: err, message: "Unable to send password recovery info to that email address." })
            }
          })
        })
      })
    })
  },

  contactUs: data => {
    return new Promise((resolve, reject) => {
      const options = {
        to: 'info@innovationscity.com',
        subject: 'User mail: ' + data.subject,
        text: 'name: ' + data.name +
              '\nemail: ' + data.email +
              '\nmessage: ' + data.message
      };

      transporter.sendMail(options, (err, info) => {
        if (!err) resolve();
        else reject({ err: err });
      })
    })
  },
}

module.exports = emailer;
