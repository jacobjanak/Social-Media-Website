const router = require('express').Router()
const exjwt = require('express-jwt');
const db = require('../models');
const upload = require('../utils/upload');

const isAuthenticated = exjwt({ secret: process.env.SECRET });

// get all businesses associated with the logged in user
router.get('/', isAuthenticated, (req, res) => {
  db.Business.find({ owner: req.user.id })
  .then(businesses => res.json(businesses || []))
  .catch(err => res.status(404).json({ err: err, message: "Unable to retrieve businesses" }))
})

router.get('/:userId', (req, res) => {
  db.Business.find({ owner: req.params.userId })
  .then(businesses => res.json(businesses || []))
  .catch(err => res.status(404).json({ err: err, message: "Unable to retrieve businesses" }))
})

router.get('/:key', (req, res) => {
  db.Business.findOne({ url: req.params.key })
  .then(data => {
    if (data) {
      res.json(data)
    } else {
      res.status(404).send({
        success: false,
        message: 'No business found'
      })
    }
  })
  .catch(err => res.status(400).send(err))
})

router.post('/create', isAuthenticated, upload.single('logo'), (req, res) => {
  if (req.file) {
    req.body.logo = '/uploads/' + req.file.filename;
  }

  const business = {
    owner: req.user.id,
  };

  const paths = db.Business.schema.paths;
  for (let k in paths) {
    const value = req.body[k];

    if (paths[k].instance === 'String') {
      if (value) {
        business[k] = value;
      }
    }
    else if (paths[k].instance === 'Array') {
      const arr = JSON.parse(value)
      if (arr) {
        business[k] = arr;
      }
    }
    else if (paths[k].instance === 'Number') {
      if (value && Number(value)) {
        business[k] = value;
      }
    }
  }
  db.Business.create(business)
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

router.post('/edit', isAuthenticated, upload.single('logo'), (req, res) => {
  if (req.file) {
    req.body.logo = '/uploads/' + req.file.filename;
  }

  db.Business.findOne({
    owner: req.user.id,
    url: req.body.key
  })
  .then(business => {
    if (!business) {
      return res.status(404).json({ message: "Business not found" })
    }

    const paths = db.Business.schema.paths;
    for (let k in paths) {
      const value = req.body[k];

      if (paths[k].instance === 'String') {
        if (value) {
          business[k] = value;
        }
      }
      else if (paths[k].instance === 'Array') {
        const arr = JSON.parse(value)
        if (arr) {
          business[k] = arr;
        }
      }
      else if (paths[k].instance === 'Number') {
        if (value && Number(value)) {
          business[k] = value;
        }
      }
    }

    return business.save();
  })
  .then(business => res.json(business))
  .catch(err => {
    console.log(err)
    res.status(500).json({
      err: err,
      message: err.message || "Error creating the business"
    })
  })
})

module.exports = router;
