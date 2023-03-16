// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");

const { getRestaurantsByLatLong } = require('../controllers/Restaurant');

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get("/", getRestaurantsByLatLong);

// Exporting Modules
module.exports = router;
