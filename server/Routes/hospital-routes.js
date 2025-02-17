const express = require('express');
const {
  getHospital,
  postHospital,
  allHospital,
  deleteHospital,
  getHospitalById,
  updateHospital,
  searchByLocation,
  getHospitalWithDepartment,
} = require('../controller/hospital-control');
const checkToken = require('../middlewares/check-token');

const router = express.Router();

router.get('/', checkToken(['ADMIN']), getHospital);
router.get('/all', checkToken(['ADMIN', 'USER']), allHospital);
router.get('/:id', checkToken(['ADMIN', 'USER']), getHospitalById);
router.get('/department/:id', getHospitalWithDepartment);
router.get('/location/:id', searchByLocation);
router.post('/', checkToken(['ADMIN']), postHospital);
router.patch('/:id', checkToken(['ADMIN']), updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;
