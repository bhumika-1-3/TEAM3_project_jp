// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const { popularPlaces, getCityDetails } = require("../controllers/places");

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get("/popular/:cityName", popularPlaces);
router.get("/details/:cityName", getCityDetails);

// Exporting Modules
module.exports = router;
