const express = require('express');
const { slotAddding, getSlot } = require('../controller/slot-control');

const router = express.Router();

router.post('/add/:id', slotAddding);
router.get('/get/:id', getSlot);

module.exports = router;
