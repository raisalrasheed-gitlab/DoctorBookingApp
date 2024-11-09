const express = require('express');
const {
  signup,
  login,
  detail,
  forgetPassword,
  resetPassword,
} = require('../controller/user-control');
const checkToken = require('../middlewares/check-token');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.get('/', checkToken, detail);
module.exports = router;
