/*
  This file is for uploading images. It can be used as a middleware
  on any route with upload.single('name').
*/

const multer = require('multer');

const uploadPath = './public/uploads/';

const upload = multer({
  limit: {
    // 5 Mb
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(file.mimetype + " is not a supported file type."), false)
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
      const timestamp = new Date().toISOString();
      const filename = timestamp + req.body.owner + '.jpg';
      cb(null, filename)
    }
  })
});

module.exports = upload;
