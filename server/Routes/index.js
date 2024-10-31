const express = require('express');
const imageRoutes = require('./image-routes');

const router = express.Router();

router.use('/image', imageRoutes);

module.exports = router;
