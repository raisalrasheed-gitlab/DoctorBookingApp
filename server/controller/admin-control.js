const express = require('express');
const bcrypt = require('bcrypt');
const routes = express.Router();
const Admin = require('../db/models/admin-schema');

module.exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    console.log(admin);
    if (admin) {
      return res.status(404).json({ message: 'Account already exist' });
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const dbResponse = await Admin.create({
      email: email,
      password: hashPassword,
    });
    res.status(202).json({ message: 'Acoount has been successfully' });
  } catch (error) {
    res.status(404).json({ message: e.message });
  }
};
