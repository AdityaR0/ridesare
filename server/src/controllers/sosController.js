const SosAlert = require('../models/SosAlert');

const createSosAlert = async (req, res) => {
  try {
    const { rideId, message, location } = req.body;

    const alert = await SosAlert.create({
      ride: rideId,
      triggeredBy: req.user._id,
      role: req.user.role,
      message,
      location
    });

    // Later we can email admin here using nodemailer.

    res.status(201).json(alert);
  } catch (error) {
    console.error('Create SOS error:', error);
    res.status(500).json({ message: 'Server error creating SOS alert' });
  }
};

const getAllSosAlerts = async (req, res) => {
  try {
    const alerts = await SosAlert.find()
      .populate('triggeredBy', 'name email')
      .populate('ride')
      .sort('-createdAt');
    res.json(alerts);
  } catch (error) {
    console.error('Get SOS error:', error);
    res.status(500).json({ message: 'Server error fetching SOS alerts' });
  }
};

module.exports = { createSosAlert, getAllSosAlerts };
