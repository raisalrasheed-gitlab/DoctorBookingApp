const express = require('express');
const {
  getDepartment,
  getIdDepartment,
  postDepartment,
  patchDepartment,
  deleteDepartment,
} = require('../controller/department-control');
const router = express.Router();

router.get('/', getDepartment);
router.get('/:id', getIdDepartment);
router.post('/', postDepartment);
router.patch('/:id', patchDepartment);
router.delete('/:id', deleteDepartment);
module.exports = router;
