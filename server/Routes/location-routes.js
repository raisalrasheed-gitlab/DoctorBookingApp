const express = require('express');
const {
  getLocation,
  postLocation,
  deleteLocation,
  getLocationById,
  updateLocationById,
} = require('../controller/location-control');
const router = express.Router();
const checkToken = require('../middlewares/check-token');

router.post('/', checkToken(['ADMIN']), postLocation);
router.get('/', getLocation);
router.get('/:id', checkToken(['ADMIN']), getLocationById);
router.delete('/:id', checkToken(['ADMIN']), deleteLocation);
router.patch('/:id', checkToken(['ADMIN']), updateLocationById);

module.exports = router;
