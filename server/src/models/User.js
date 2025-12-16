const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // BASIC AUTH DETAILS
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["passenger", "driver", "admin"],
      default: "passenger",
    },

    // PROFILE COMPLETION FLAG
    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    // COMMON PROFILE FIELDS
    gender: { type: String, default: "" },
    workingAt: { type: String, default: "" },
    address: { type: String, default: "" },
    aadharNumber: { type: String, default: "" },
    drivingLicense: { type: String, default: "" },

    // ✅ DRIVER VEHICLES (ARRAY — CORRECT PLACE)
    vehicles: [
      {
        vehicleType: {
          type: String,
          enum: ["car", "bike"],
          required: true,
        },
        vehicleName: {
          type: String,
          required: true,
        },
        vehicleNumber: {
          type: String,
          required: true,
        },
      },
    ],

    // PASSENGER STATS
    totalRidesTaken: { type: Number, default: 0 },
    passengerCancelledRides: { type: Number, default: 0 },

    // DRIVER STATS
    totalRidesGiven: { type: Number, default: 0 },
    driverCancelledRides: { type: Number, default: 0 },
    activeRides: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// PASSWORD HASH
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// MATCH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
