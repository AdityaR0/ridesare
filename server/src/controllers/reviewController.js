const Review = require('../models/Review');
const Ride = require('../models/Ride');

const createReview = async (req, res) => {
  try {
    const { rideId, rating, comment } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    // (Optional) you can check if user was passenger in the ride
    const review = await Review.create({
      ride: rideId,
      reviewer: req.user._id,
      rating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error creating review' });
  }
};

const getRideReviews = async (req, res) => {
  try {
    const { rideId } = req.params;
    const reviews = await Review.find({ ride: rideId })
      .populate('reviewer', 'name')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};

module.exports = { createReview, getRideReviews };
