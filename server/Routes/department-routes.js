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
router.get('/:id', getIdDepartment);
router.post('/', postDepartment);
router.patch('/:id', patchDepartment);
router.delete('/:id', deleteDepartment);
module.exports = router;
