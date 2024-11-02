const express = require('express');
const imageRoutes = require('./image-routes');
const departmentRoutes = require('./department-routes');
const adminRoutes = require('./admin-routes');

const router = express.Router();

router.use('/image', imageRoutes);
router.use('/department', departmentRoutes);
router.use('/admin', adminRoutes);
module.exports = router;
