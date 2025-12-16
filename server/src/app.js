const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const sosRoutes = require("./routes/sosRoutes");
const userRoutes = require("./routes/userRoutes");
const driverRoutes = require("./routes/driverRoutes");
const communityRoutes = require("./routes/communityRoutes");

const app = express();

/* =======================
   SECURITY & MIDDLEWARE
======================= */
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

/* =======================
   CORS (FINAL FIX)
======================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://ridesare-frontend.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server / same-origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* =======================
   RATE LIMIT (AUTH)
======================= */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later",
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/community", communityRoutes);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).send("Carpool API is running 🚗");
});

module.exports = app;
