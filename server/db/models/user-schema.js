const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    bloodgroup: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    phonenumber: {
      type: String,
    },
    image: {
      type: String,
      default: 'http:localhost:8001/image/no-user.png',
    },
    role: {
      type: String,
      default: 'USER',
      immutable: true,
    },
  },
  { timestamps: true }
);

const User = model('users', userSchema);
module.exports = User;
