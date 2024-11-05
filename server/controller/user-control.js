const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db/models/user-schema');
const jwt = require('jsonwebtoken');
module.exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      address,
      email,
      password,
      age,
      gender,
      bloodgroup,
      weight,
      height,
      phonenumber,
      image,
    } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({ message: 'user is already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    console.log(hashedPassword);
    const dbResponse = await User.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      address: address,
      age: age,
      bloodgroup: bloodgroup,
      gender: gender,
      height: height,
      weight: weight,
      phonenumber: phonenumber,
      image: image,
    });
    res.status(202).json({ messgae: 'user account has been created' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !password) {
      return res.status(404).json({ message: 'email or password incorrect' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(404)
        .json({ message: 'email or password is incorrect' });
    }
    const Token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '7D' }
    );
    return res.status(202).json({ message: 'you are logged In', token: Token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
module.exports.detail = async (req, res) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
