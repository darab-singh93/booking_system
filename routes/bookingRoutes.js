const express = require('express');
const router = express.Router();
const { bookSlot, getAllBookings } = require('../controllers/bookingController');
const { protect, isAdmin } = require('../middleware/auth');

router.post('/', protect, bookSlot);
router.get('/', protect, isAdmin, getAllBookings);

module.exports = router;
