const express = require('express');
const { signup, login } = require('../controller/admin-control');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
