const router = require('express').Router()
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('../models');
const emailer = require('../utils/emailer');
const upload = require('../utils/upload');

const isAuthenticated = exjwt({ secret: 'swag' });

router.get('/', isAuthenticated, (req, res) => {
  db.User.findById(req.user.id)
  .then(data => {
    if (data) {
      res.json(data)
    } else {
      res.status(404).send({
        success: false,
        message: 'No user found'
      })
    }
  })
  .catch(err => res.status(400).send(err))
})

router.get('/:key', (req, res) => {
  db.User.findOne({ url: req.params.key })
  .then(data => {
    if (data) {
      res.json(data)
    } else {
      res.status(404).send({
        success: false,
        message: 'No user found'
      })
    }
  })
  .catch(err => res.status(400).send(err))
})

router.post('/signup', (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: {
      investor: req.body.role.investor,
      entrepreneur: req.body.role.entrepreneur,
    }
  })
  .then(user => {
    emailer.confirmEmail(user)
    .then(() => res.sendStatus(200))
    .catch(err => {
      user.remove()
      res.status(401).json({
        err: err,
        message: err.message || 'Error verifying your email'
      })
    })
  })
  .catch(err => {
    res.status(500).json({
      err: err,
      message: err.message || 'Unable to create account. Please try again later'
    })
  })
})

router.post('/login', (req, res) => {
  db.User.findOne({ email: req.body.email })
  .then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        if (user.emailConfirmed) {

          // must pass a simple object as first arg of sign()
          //NOTE: should only be using id
          const token = jwt.sign({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            img: user.img
          }, 'swag', {
            expiresIn: 12960000
          });

          res.json({
            success: true,
            message: "Token issued.",
            token: token,
            user: user
          })
        } else {
          // email not confirmed
          res.status(401).json({ emailNotConfirmed: true })
        }
      } else {
        // wrong password
        res.status(401).json({ err: err, message: "Incorrect password" })
      }
    })
  })
  .catch(err => {
    res.status(404).json({ err: err, message: "User not found" })
  })
})

router.post('/edit', isAuthenticated, upload.single('img'), (req, res) => {
  if (req.file) {
    req.body.img = '/uploads/' + req.file.filename;
  }

  db.User.findById(req.user.id)
  .then(user => {
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.img) user.img = req.body.img;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.birthday) user.birthday = req.body.birthday;
    if (req.body.interests) user.interests = req.body.interests;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.education) user.education = req.body.education;
    if (req.body.ethnicity) user.ethnicity = req.body.ethnicity;
    if (req.body.street) user.street = req.body.street;
    if (req.body.zip) user.zip = req.body.zip;
    if (req.body.city) user.city = req.body.city;
    if (req.body.state) user.state = req.body.state;
    if (req.body.country) user.country = req.body.country;
    user.save()
    .then(user => res.json(user))
    .catch(err => res.sendStatus(500))
  })
})

router.post('/edit/password', (req, res) => {
  db.Reset.findOne({ key: req.body.key })
  .then(reset => db.User.findOne({ _id: reset.user }))
  .then(user => {
    user.password = req.body.password;
    return user.save();
  })
  .then(user => res.json(user))
  .catch(err => res.sendStatus(404))
})

router.post('/confirm', (req, res) => {
  db.Confirm.findOne({ key: req.body.key })
  .then(confirm => db.User.findOne({ _id: confirm.user }))
  .then(user => {
    user.emailConfirmed = true;
    return user.save();
  })
  .then(user => res.sendStatus(200))
  .catch(err => {
    console.log(err)
    console.log(err.message)
    res.sendStatus(404)
  })
})

module.exports = router;
