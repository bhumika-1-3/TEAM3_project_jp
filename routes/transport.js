// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const { getBestFlights } = require("../controllers/transport");

// Initializing router
const router = new express.Router();

router.get(
  "/flights/:origin/:destination/:departureDate/:returnDate/:adults/:children",
  getBestFlights
);

// Exporting Modules
module.exports = router;
