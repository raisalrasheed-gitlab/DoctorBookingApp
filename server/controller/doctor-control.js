const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Doctor = require('../db/models/doctor-schema');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

module.exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, specialization, about, image } =
      req.body;

    const doctor = await Doctor.findOne({ email: email });
    if (doctor) {
      return res.status(404).json({ message: 'Account has already exist' });
    }
    //auto password generator
    const password = generator.generate({ length: 10, number: true });
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 3);

    const dbResponse = await Doctor.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      specialization: specialization,
      about: about,
      image: image,
    });

    //mail sending
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'softwaredeveloper3132@gmail.com',
        pass: 'szrk iwcb bkoc fxws',
      },
    });
    var mailOptions = {
      from: 'softwaredeveloper3132@gmail.com',
      to: email,
      subject: 'DOC APP LOGIN DETAILS',
      text: `HI ${firstname},
           your password is ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({ message: 'password has been send' });
      }
    });
    //szrk iwcb bkoc fxws
  } catch (error) {
    res.status(404).json({ message: error.message, error: true });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email: email });
  if (!doctor) {
    return res.status(404).json({ message: 'email or password incorrect' });
  }
  if (!password) {
    return res.status(404).json({ message: 'email or password incorrect' });
  }
  const match = await bcrypt.compare(password, doctor.password);
  if (!match) {
    return res.status(404).json({ message: 'email or password incorrect' });
  }
  const Token = await jwt.sign(
    { id: doctor._id, role: doctor.role },
    process.env.DOCTOR_KEY,
    { expiresIn: '7D' }
  );
  res.status(200).json({ message: 'your are loggin ', Token });
};
module.exports.detail = async (req, res) => {
  const doctor = await Doctor.find();
  res.status(202).json(doctor);
};
