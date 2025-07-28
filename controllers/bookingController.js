const Booking = require('../models/Booking');

const formatSlot = (rawSlot) => {
  const date = new Date(`1970-01-01T${rawSlot}`);
  return new Date(`1970-01-01T${rawSlot}`)
    .toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });
};

exports.bookSlot = async (req, res) => {
  try {
    const { name, mobile, message, slot } = req.body;

    const formattedSlot = formatSlot(slot); // Normalize
    const count = await Booking.countDocuments({ slot: formattedSlot });

    if (count >= 10) {
      return res.status(400).json({ message: 'Booking slot is full' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      name,
      mobile,
      message,
      slot: formattedSlot
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name email');
  res.json(bookings);
};
