const { Schema, model } = require('mongoose');

const reviewSchema = Schema({
  Comment: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'hospitals',
  },
});

const Review = model('reviews', reviewSchema);

module.exports = Review;
