const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../db/models/user-schema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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
module.exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'email doesnot exist' });
    }
    const Token = jwt.sign({ id: user._id }, process.env.RESET_KEY, {
      expiresIn: '1h',
    });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'softwaredeveloper3132@gmail.com',
        pass: 'szrk iwcb bkoc fxws',
      },
    });

    var mailOptions = {
      from: 'softwaredeveloper3132@gmail.com',
      to: 'user1@gmail.com,raisalrasheed545@gmail.com',
      subject: 'Doct booking App',
      text: `Hi ${user.firstname},
    your password reset ${Token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'mail issue' });
      } else {
        return res
          .status(200)
          .json({ message: 'Password reset link has been sent your email' });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'email doest not match' });
    }
    if (!(password == confirmPassword)) {
      return res.status(404).json({ message: 'password doest not match' });
    }
    const match = jwt.verify(token, process.env.RESET_KEY);
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log(hashedPassword);
    const dbResponse = await User.findByIdAndUpdate(
      { _id: user._id },
      { password: hashedPassword }
    );
    return res.status(202).json({ message: 'password has been changed' });
  } catch (error) {
    return res.status(404).json({ message: error });
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
