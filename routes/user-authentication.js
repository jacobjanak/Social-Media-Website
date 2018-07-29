const router = require('express').Router()
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('../models');

const isAuthenticated = exjwt({ secret: 'swag' });

router.get('/api/user/:id', isAuthenticated, (req, res) => {
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

router.post('/api/signup', (req, res) => {
  console.log(req.body)
  db.User.create(req.body)
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

router.post('/api/login', (req, res) => {
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
          message: "Token Issued!",
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

module.exports = router;
