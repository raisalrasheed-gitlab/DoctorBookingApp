const { Schema, model } = require('mongoose');

const locationSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //(created time & updated time)
);

const Location = model('locations', locationSchema);

module.exports = Location;
