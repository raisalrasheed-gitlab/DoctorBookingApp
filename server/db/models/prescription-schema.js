const { Schema, model } = require('mongoose');

const prescriptionSchema = Schema(
  {
    Comment: {
      type: string,
      required: true,
      trim: true,
    },
    docter: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'hospitals',
    },
  },
  { timestamps: true }
);
const Prescription = model('prescriptions', prescriptionSchema);
module.exports = Prescription;
