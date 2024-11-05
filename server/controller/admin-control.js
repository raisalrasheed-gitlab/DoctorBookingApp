const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const Admin = require('../db/models/admin-schema');
const jwt = require('jsonwebtoken');

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      return res.status(404).json({ message: 'Account already exist' });
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const dbResponse = await Admin.create({
      email: email,
      password: hashPassword,
    });
    res.status(202).json({ message: 'Account has been successfully created' });
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(400).json({ message: 'email or password incorrect' });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res
        .status(400)
        .json({ message: 'email or password is incorrect' });
    }
    const Token = await jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );
    return res.status(200).json({ message: 'you are loginIn', token: Token });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};
