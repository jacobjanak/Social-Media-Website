const router = require('express').Router()
const exjwt = require('express-jwt');
const path = require('path');
const fs = require('fs');
const db = require('../models');
const emailer = require('../utils/emailer');

//NOTE: remove this
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jakeathotmail@gmail.com',
    pass: 'Qweasd8072'
  }
});

const isAuthenticated = exjwt({ secret: 'swag' });

router.post('/reset-password', (req, res) => {
  const email = req.body.email;

  db.User.findOne({ email: email })
  .then(user => {
    if (user) {
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
            to: email,
            subject: 'Reset Your Password',
            html: result
          };

          transporter.sendMail(options, (err, info) => {
            if (!err) {
              res.json(email)
            } else {
              res.status(500).json({
                err: err,
                message: "Unable to send password recovery info to that email address."
              })
            }
          })
        })
      })
    } else {
      res.status(404).json({
        err: err,
        message: "No account found with that email address."
      })
    }
  })
  .catch(err => {
    res.status(404).json({
      err: err,
      message: "No account found with that email address."
    })
  })
})

router.post('/confirm', (req, res) => {
  // this is for re-sending the confirmation email
  db.User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return emailer.resendConfirmEmail(user)
    } else {
      res.status(401).json({ message: "No account found with that email address." })
    }
  })
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).json({ message: err.message }))
})

module.exports = router;
