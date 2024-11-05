const express = require('express');
const {
  getDepartment,
  getIdDepartment,
  postDepartment,
  patchDepartment,
  deleteDepartment,
} = require('../controller/department-control');
const checkToken = require('../middlewares/check-token');
const router = express.Router();

router.get('/', checkToken(['ADMIN']), getDepartment);
router.get('/:id', checkToken, getIdDepartment);
router.post('/', checkToken, postDepartment);
router.patch('/:id', checkToken, patchDepartment);
router.delete('/:id', checkToken, deleteDepartment);
module.exports = router;
