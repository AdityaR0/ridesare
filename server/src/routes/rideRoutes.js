// src/routes/rideRoutes.js
const express = require('express');
const { body } = require('express-validator');
const rideController = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// POST /api/rides - create a ride (driver)
router.post(
  '/',
  authMiddleware,
  [
    body('from').notEmpty().withMessage('From location is required'),
    body('to').notEmpty().withMessage('To location is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('time').notEmpty().withMessage('Time is required'),
    body('availableSeats')
      .isInt({ min: 1 })
      .withMessage('Available seats must be at least 1'),
    body('pricePerSeat')
      .isFloat({ min: 0 })
      .withMessage('Price per seat is required'),
  ],
  rideController.createRide  // ✅ function reference
);

// GET /api/rides - search/list rides
router.get('/', authMiddleware, rideController.getAvailableRides);

// POST /api/rides/:rideId/book - book ride (passenger)
router.post('/:rideId/book', authMiddleware, rideController.bookRide);

// POST /api/rides/:rideId/sos - SOS during ride
router.post('/:rideId/sos', authMiddleware, rideController.sendSOS);

// POST /api/rides/:rideId/review - review after ride
router.post(
  '/:rideId/review',
  authMiddleware,
  [
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString(),
  ],
  rideController.addReview
);

module.exports = router;
