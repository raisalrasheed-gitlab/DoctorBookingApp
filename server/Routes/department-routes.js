const express = require('require');
const Department = require('../db//models/department-schema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const department = await Department.find();
    res.status(200);
  } catch (error) {}
});
