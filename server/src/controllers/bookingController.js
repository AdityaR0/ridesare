const Ride = require('../models/Ride');
const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { rideId, seatsBooked } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = await Booking.create({
      ride: rideId,
      passenger: req.user._id,
      seatsBooked: seatsBooked || 1,
      status: 'confirmed'
    });

    ride.seatsAvailable -= seatsBooked || 1;
    ride.passengers.push(req.user._id);
    await ride.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user._id })
      .populate('ride')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

module.exports = { createBooking, getMyBookings };
