const express = require('express');
const { signup } = require('../controller/admin-control');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
