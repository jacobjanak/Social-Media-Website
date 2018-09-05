const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const db = require('../models');

const url = 'http://innovationscity.us-west-1.elasticbeanstalk.com';

const transporter = nodemailer.createTransport({
  name: os.hostname(),
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASS,
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

          const confirmUrl = `${url}/confirm?key=${confirm.key}`;
          const result = data
            .toString()
            .replace(/{{name}}/g, user.firstName || '')
            .replace(/{{action_url}}/g, confirmUrl);

          const options = {
            to: user.email,
            from: process.env.EMAIL_NAME,
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

  //NOTE: pretty lame that I just copy+pasted this... let's change that
  resendConfirmEmail: user => {
    return new Promise((resolve, reject) => {
      db.Confirm.findOne({ user: user._id })
      .then(confirm => {
        const pathToHTML = path.join(__dirname, '../emails/welcome.html');
        fs.readFile(pathToHTML, (err, data) => {
          if (err) reject({ err: err });

          const confirmUrl = `${url}/confirm?key=${confirm.key}`;
          const result = data
            .toString()
            .replace(/{{name}}/g, user.firstName || '')
            .replace(/{{action_url}}/g, confirmUrl);

          const options = {
            to: user.email,
            from: process.env.EMAIL_NAME,
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
          if (err) reject({ err: err, message: "Error creating email" });

          const resetUrl = `${url}/reset?key=${reset.key}`;

          const result = data
            .toString()
            .replace(/{{name}}/g, user.firstName || '')
            .replace(/{{action_url}}/g, resetUrl);

          const options = {
            to: user.email,
            from: process.env.EMAIL_NAME,
            subject: 'Reset Your Password',
            html: result
          };

          transporter.sendMail(options, (err, info) => {
            if (!err) resolve(user.email);
            else reject({ err: err, message: "Unable to send password recovery info to that email address." });
          })
        })
      })
    })
  },

  contactUs: data => {
    return new Promise((resolve, reject) => {
      const options = {
        to: 'info@innovationscity.com',
        from: process.env.EMAIL_NAME,
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
