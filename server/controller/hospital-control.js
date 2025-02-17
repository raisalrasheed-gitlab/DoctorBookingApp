const hospital = require('../db/models/hospital-schema');
const Hospital = require('../db/models/hospital-schema');
const express = require('express');
const mongoose = require('mongoose');

module.exports.getHospital = async (req, res) => {
  const hospital = await Hospital.find();
  res.status(200).json(hospital);
};
module.exports.getHospitalWithDepartment = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'departments', // The collection to join
        localField: 'department', // The array of location IDs in the hospitals collection
        foreignField: '_id', // The field in the locations collection
        as: 'deptDetails', // The output array field
      },
    },
  ]);

  res.status(200).json(hospital);
};
module.exports.allHospital = async (req, res) => {
  const hospital = await Hospital.find()
    .populate('department')
    .populate('location');
  res.status(200).json(hospital);
};
module.exports.searchByLocation = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.find({
    location: id,
  });

  //   {
  //     $lookup: {
  //       from: 'locations',
  //       localField: 'location',
  //       foreignField: '_id',
  //       as: 'searchLocation',
  //     },
  //   },
  //   {
  //     $unwind: '$searchLocation', // Deconstruct the searchLocation array
  //   },
  //   {
  //     $match: { 'searchLocation.name': 'MANNAR' },
  //   },
  // ]);
  res.status(200).json(hospital);
};
module.exports.postHospital = async (req, res) => {
  try {
    const { body } = req;
    const hospital = await Hospital.create(body);
    res.status(200).json(hospital);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const dbResponse = await Hospital.findByIdAndDelete(id);
    res.status(200).json(dbResponse);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports.getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbResponse = await Hospital.findById(id);
    res.status(201).json(dbResponse);
  } catch (error) {}
};
module.exports.updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const dbResponse = await hospital.findByIdAndUpdate(id, body);
    res.status(202).json(dbResponse);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
