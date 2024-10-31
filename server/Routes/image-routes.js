const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/');
  },
  filename: function (req, file, cb) {
    cb(null, `${uniqid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res) => {
  res.status(201).json({
    Message: 'image upload',
    url: `http://localhost:8001/image/${req.file.filename}`,
  });
});

module.exports = router;
