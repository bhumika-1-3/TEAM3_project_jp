// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const { returnHotels } = require("../controllers/hotels");

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get(
  "/all/:cityName/:adults/:children/:price/:checkin_date/:checkout_date/:no_of_rooms",
  returnHotels
);

// Exporting Modules
module.exports = router;
