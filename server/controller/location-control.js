const express = require('express');
const Location = require('../db/models/location-schema');

module.exports.postLocation = async (req, res) => {
  try {
    const { body } = req;
    const location = await Location.create(body);
    res.status(200).json(location);
  } catch (error) {
    res.status(404).json();
  }
};
module.exports.getLocation = async (req, res) => {
  const location = await Location.find();
  res.status(200).json(location);
};
module.exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  const location = await Location.findById(id);
  res.status(200).json(location);
};
module.exports.updateLocationById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(body);
  const dbResponse = await Location.findByIdAndUpdate(id, body);

  res.status(202).json(dbResponse);
};
module.exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  const dbResponse = await Location.findByIdAndDelete(id);
  res.status(200).json(dbResponse);
};
