const router = require('express').Router()
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('../models');
const upload = require('../utils/upload');

const isAuthenticated = exjwt({ secret: 'swag' });

router.get('/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
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
  db.User.create(req.body)
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

router.post('/login', (req, res) => {
  db.User.findOne({ email: req.body.email })
  .then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {

        // must pass a simple object as first arg of sign()
        const token = jwt.sign({
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          img: user.img
        }, 'swag', {
          expiresIn: 129600
        });

        res.json({
          success: true,
          message: "Token issued.",
          token: token,
          user: user
        })
      } else {
        res.status(401).json({
          success: false,
          message: "Authentication failed. Wrong password."
        })
      }
    })
  })
  .catch(err => {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: err
    })
  })
})

router.post('/edit', isAuthenticated, upload.single('img'), (req, res) => {
  if (req.file) {
    req.body.img = req.file.filename;
  }

  db.User.findById(req.user.id)
  .then(user => {
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.img) user.img = req.body.img;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.birthday) user.birthday = req.body.birthday;
    if (req.body.interests) user.interests = req.body.interests;
    if (req.body.education) user.education = req.body.education;
    if (req.body.ethnicity) user.ethnicity = req.body.ethnicity;
    if (req.body.street) user.street = req.body.street;
    if (req.body.zip) user.zip = req.body.zip;
    if (req.body.city) user.city = req.body.city;
    if (req.body.state) user.state = req.body.state;
    if (req.body.country) user.country = req.body.country;
    user.save()
    .then(user => res.json(user))
    .catch(err => console.log(err))
  })
})

module.exports = router;
