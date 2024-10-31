const { Schema, model } = require('mongoose');

const departmentSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8001/image/no-img.jpg',
    },
  },
  { timestamps: true }
);

const Department = model('departments', departmentSchema);
module.exports = Department;
