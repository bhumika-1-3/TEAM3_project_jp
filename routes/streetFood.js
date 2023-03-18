// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');
const { itenaryJson } = require('../controllers/openFastFood');

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
// router.get('/:cityName', findStreetFood);
router.post(
  '/itinary/:cityName/:budget/:adults/:children/:departureDate/:returnDate/:origin/:destination/:no_of_rooms',
  itenaryJson
);

// Exporting Modules
module.exports = router;
