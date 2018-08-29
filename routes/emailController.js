const router = require('express').Router()
const exjwt = require('express-jwt');
const db = require('../models');
const emailer = require('../utils/emailer');

const isAuthenticated = exjwt({ secret: 'swag' });

router.post('/reset-password', (req, res) => {
  const email = req.body.email;
  db.User.findOne({ email: email })
  .then(user => {
    if (user) {
      return emailer.resetPassword(user);
    } else {
      res.status(404).json({ message: "No account found with that email address." })
    }
  })
  .then(email => res.json(email))
  .catch(err => res.status(500).json({ err: err, message: err.message }))
})

router.post('/confirm', (req, res) => {
  // this is for re-sending the confirmation email
  // NOTE: rename to /confirm/resend?
  db.User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return emailer.resendConfirmEmail(user)
    } else {
      res.status(401).json({ message: "No account found with that email address." })
    }
  })
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).json({ err: err, message: err.message }))
})

router.post('/contact-us', (req, res) => {
  emailer.contactUs(req.body)
  .then(() => res.sendStatus(200))
  .catch(err => res.status(500).json({ err: err, message: "There was an issue sending your message" }))
})

module.exports = router;
