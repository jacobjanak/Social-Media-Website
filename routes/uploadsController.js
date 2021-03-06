const router = require('express').Router()
const path = require('path');

router.get('/:img', (req, res) => {
  res.sendFile(path.resolve('./public/uploads/', req.params.img))
})

module.exports = router;
