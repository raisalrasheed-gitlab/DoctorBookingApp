const { Schema, model } = require('mongoose');
const Review = require('./review--schema');

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'departments',
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reviews',
      },
    ],
  },
  { timestamps: true }
);
