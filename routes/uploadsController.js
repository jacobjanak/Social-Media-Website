const router = require('express').Router()
const path = require('path');

router.get('/uploads/:img', (req, res) => {
  console.log('uploads hit!')
  res.sendFile(path.resolve('./public/uploads/', req.params.img))
})

module.exports = router;
