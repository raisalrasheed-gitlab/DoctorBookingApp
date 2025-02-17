const express = require('express');

const Slot = require('../db/models/slot-schema');

module.exports.slotAddding = async (req, res) => {
  try {
    const { id } = req.params;
    const { time } = req.body;
    const doctorSlot = await Slot.create({ doctor: id, time: time });
    res.status(201).json(doctorSlot);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.getSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const slot = await Slot.find({ doctor: id });
    res.status(200).json(slot);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
