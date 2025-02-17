const { Schema, model } = require('mongoose');
const Review = require('./review--schema');

const hospitalSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'locations',
      required: true,
    },
    image: {
      type: String,
      default: 'http://localhost:8001/image/no-img.jpg',
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
    department: [
      {
        type: Schema.Types.ObjectId,
        ref: 'departments',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reviews',
      },
    ],
  },
  { timestamps: true }
);

const hospital = model('hospitals', hospitalSchema);
module.exports = hospital;
