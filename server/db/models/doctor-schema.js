const { Schema, model } = require('mongoose');

const slotSchema = Schema({
  date: {
    type: Date,
    required: true,
  },
  startingtime: {
    type: String,
    required: true,
  },
  endingtime: {
    type: String,
    required: true,
  },
  slotnumber: {
    type: Number,
    required: true,
  },
});

const doctorSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
    },
    specialization: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    image: {
      type: String,
      default: 'http://localhost:8001/image/no-img.jpg',
    },
    role: {
      type: String,
      default: 'DOCTOR',
    },
  },
  { timestamps: true }
);

const Doctor = model('doctors', doctorSchema);
module.exports = Doctor;
