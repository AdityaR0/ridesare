const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema(
  {
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: { type: String, enum: ['passenger', 'driver'], required: true },
    message: { type: String, required: true },
    location: { type: String },
    resolved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const SosAlert = mongoose.model('SosAlert', sosSchema);

module.exports = SosAlert;
