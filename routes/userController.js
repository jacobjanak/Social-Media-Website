const router = require('express').Router()
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('../models');
const emailer = require('../utils/emailer');
const upload = require('../utils/upload');

const isAuthenticated = exjwt({ secret: process.env.SECRET });

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

// get an array of users with an optional search param
router.get('/search/:search*?', (req, res) => {
  if (req.params.search) {
    res.sendStatus(200)
  } else {
    db.User.find()
    .then(users => res.json({ users: users }))
    .catch(err => res.status(500).json({ err: err }))
  }
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
        message: err.message || 'Error verifying your email address'
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
          }, process.env.SECRET, {
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
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const paths = db.User.schema.paths;
    for (let k in paths) {
      const value = req.body[k];

      if (k === 'twitter') {
        console.log('69696969')
      }

      console.log(value)

      if (paths[k].instance === 'String') {
        if (value || value === '') {
          user[k] = value;
        }
      }
      else if (paths[k].instance === 'Array') {
        if (value && value.constructor === Array) {
          const arr = JSON.parse(value)
          if (arr) {
            user[k] = arr;
          }
        }
      }
      else if (paths[k].instance === 'Number') {
        if (value && Number(value)) {
          user[k] = value;
        }
      }
    }

    user.updatedAt = new Date();

    user.save()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ err: err }))
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
  .then(confirm => {
    if (confirm) {
      return db.User.findOne({ _id: confirm.user });
    } else {
      res.status(401).json({ message: 'Wrong key in the url' })
    }
  })
  .then(user => {
    user.emailConfirmed = true;
    return user.save();
  })
  .then(user => res.sendStatus(200))
  .catch(err => res.sendStatus(404))
})

// get user by their id or url key (should be at bottom of userController)
router.get('/:idOrKey', (req, res) => {
  db.User.findOne({
    $or: [
      { url: req.params.idOrKey },
      // mongoose needs the id to be at least 12 chars long or error
      { _id: req.params.idOrKey.length >= 12
        ? req.params.idOrKey
        : '111111111111'
      }
    ]
  })
  .exec((err, user) => {
    if (user && !err) {
      res.json(user)
    } else {
      res.status(404).send({
        success: false,
        message: 'No user found'
      })
    }
  })
})

module.exports = router;
