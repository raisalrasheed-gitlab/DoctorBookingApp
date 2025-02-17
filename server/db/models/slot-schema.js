const { Schema, model } = require('mongoose');
const slotSchema = Schema(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'doctors',
    },
    patient: { type: Schema.Types.ObjectId, ref: 'users' },
    date: { type: Date },
    time: {
      type: String,
      required: true,
    },
    isBooked: { type: Boolean, default: false },
  },
  { timeStamps: true }
);
const Slot = model('slots', slotSchema);
module.exports = Slot;
