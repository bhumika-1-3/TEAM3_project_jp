// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
// Importing controllers and utilities
const {
  signup,
  login,
  logout,
  logoutAll,
  changePassword,
  forgotPassword,
  resetPassword,
  testTwilio,
  verifyTenant,
  verifyOtp,
} = require("../controllers/auth");

// Initializing router
const router = new express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/logout", authorizeJWT.verifyJWT, logout);
router.put("/logoutall", authorizeJWT.verifyJWT, logoutAll);
router.put("/changepassword", authorizeJWT.verifyJWT, changePassword);

// Exporting Modules
module.exports = router;
