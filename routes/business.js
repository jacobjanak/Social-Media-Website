const router = require('express').Router()
const db = require('../models');

router.post('/api/business', (req, res) => {
  console.log(req.body)
  db.Business.create(req.body)
  .then(data => res.json(data))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})

router.post('/api/user/businesses', (req, res) => {
  db.Business.find({ owner: req.body.userID })
  .then(businesses => res.json(businesses))
  .catch(err => {
    console.log(err)
    res.status(400).json(err)  
  })
})

module.exports = router;
