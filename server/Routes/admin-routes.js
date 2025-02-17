const express = require('express');
const { signup, login, detail } = require('../controller/admin-control');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/detail/:id', detail);

module.exports = router;
