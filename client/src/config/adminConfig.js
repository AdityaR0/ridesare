// src/config/adminConfig.js

// 🔑 This is the password you must type on the Admin tab.
export const ADMIN_PASSWORD = "admin123"; // change if you want

// Fake admin user saved into AuthContext when admin logs in
export const ADMIN_USER = {
  id: "admin-1",
  name: "System Admin",
  email: "admin@rideshare.local",
  role: "admin",
  token: "ADMIN_STATIC_TOKEN", // just a placeholder
};
