const express = require('express');
const { createReview, getRideReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/ride/:rideId', getRideReviews);

module.exports = router;
