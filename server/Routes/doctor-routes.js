const express = require('express');
const { signup, login, detail } = require('../controller/doctor-control');
const checkToken = require('../middlewares/check-token');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', checkToken(['DOCTOR', 'ADMIN']), detail);

module.exports = router;
