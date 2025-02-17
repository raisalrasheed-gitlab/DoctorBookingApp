const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Doctor = require('../db/models/doctor-schema');
const generator = require('generate-password');
const nodemailer = require('nodemailer');
const hospital = require('../db/models/hospital-schema');

module.exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      specialization,
      about,
      image,
      department,
      hospital,
    } = req.body;
    console.log(req.body);
    const doctor = await Doctor.findOne({ email: email });
    if (doctor) {
      return res.status(404).json({ message: 'Account has already exist' });
    }
    //auto password generator
    const password = generator.generate({ length: 10, number: true });
    const hashedPassword = await bcrypt.hash(password, 3);

    const dbResponse = await Doctor.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
      department: department,
      hospital: hospital,
      specialization: specialization,
      about: about,
      image: image,
    });
    console.log('done');
    // ----------mail sending-----------
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
    console.log('first');
    return res.status(404).json({ message: 'email or password incorrect' });
  }
  const Token = jwt.sign(
    { id: doctor.id, role: doctor.role },
    process.env.SECRET_KEY,
    { expiresIn: '7D' }
  );
  res.status(200).json({ message: 'your are loggin ', Token });
};
module.exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const doctor = await Doctor.findOne({ email: email });
  if (!doctor) {
    return res.status(404).json({ message: 'email has doesnot exist' });
  }
  const resetToken = jwt.sign({ id: doctor._id }, process.env.RESET_KEY, {
    expiresIn: '1h',
  });

  var nodemailer = require('nodemailer');

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
    subject: 'Doc booking APP',
    text: `Hi ${doctor.firstname},
       password reset linke http://localhost:8001/${resetToken}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error });
    } else {
      return res
        .status(200)
        .json({ message: 'Password reset link has been sent your link' });
    }
  });
};
module.exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword, token } = req.body;
    const doctor = await Doctor.findOne({ email: email });
    if (!doctor) {
      return res.status(404).json({ message: 'email doest not exist' });
    }
    if (!(password == confirmPassword)) {
      return res.status(404).json({ message: 'password doesnot match' });
    }
    const ismatch = jwt.verify(token, process.env.RESET_KEY);
    const hashedPassword = await bcrypt.hash(password, 3);
    const dpResponse = await Doctor.findByIdAndUpdate(
      { _id: doctor._id },
      { password: hashedPassword }
    );
    return res.status(202).json({ message: 'Password has been changed' });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
module.exports.detail = async (req, res) => {
  const doctor = await Doctor.find()
    .populate({
      path: 'department',
      select: ['name'],
    })
    .populate({ path: 'hospital', select: ['name'] });
  res.status(202).json(doctor);
};
module.exports.findDoctorByIds = async (req, res) => {
  try {
    const { hId, dId } = req.params;
    console.log('enetyr');
    const doctor = await Doctor.findOne({
      department: dId,
      hospital: hId,
    }).populate('hospital');
    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
