// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const {
  popularPlacesAmadeus,
  getCityDetails,
  popularPlacesOpenTripMap,
} = require("../controllers/places");

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get("/popular/:cityName", popularPlacesOpenTripMap);
router.get("/details/:cityName", getCityDetails);

// Exporting Modules
module.exports = router;
