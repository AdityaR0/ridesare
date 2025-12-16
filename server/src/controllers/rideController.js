// src/controllers/rideController.js
const { validationResult } = require('express-validator');
const Ride = require('../models/Ride');

exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = new Ride({
      driver: req.user.userId,
      ...req.body,
    });

    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    console.error('Create ride error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAvailableRides = async (req, res) => {
  try {
    const rides = await Ride.find({}).populate('driver', 'fullName email');
    res.json(rides);
  } catch (err) {
    console.error('Get rides error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.bookRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    ride.passengers.push(req.user.userId);
    ride.availableSeats -= 1;

    await ride.save();
    res.json({ message: 'Ride booked successfully', ride });
  } catch (err) {
    console.error('Book ride error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendSOS = async (req, res) => {
  try {
    // For now, just log. Later we can email admin / store SOS in DB.
    console.log(
      `🚨 SOS from user ${req.user.userId} for ride ${req.params.rideId}`
    );
    res.json({ message: 'SOS received by admin (simulated)' });
  } catch (err) {
    console.error('SOS error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.reviews.push({
      passenger: req.user.userId,
      rating: req.body.rating,
      comment: req.body.comment || '',
    });

    await ride.save();
    res.json({ message: 'Review added', ride });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
