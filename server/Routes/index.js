const express = require('express');
const imageRoutes = require('./image-routes');
const departmentRoutes = require('./department-routes');
const adminRoutes = require('./admin-routes');
const doctorRoutes = require('./doctor-routes');
const userRoutes = require('./user-routes');

const router = express.Router();

router.use('/image', imageRoutes);
router.use('/department', departmentRoutes);
router.use('/admin', adminRoutes);
router.use('/doctor', doctorRoutes);
router.use('/user', userRoutes);
module.exports = router;
