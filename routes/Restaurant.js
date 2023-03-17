// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');

const {
  getRestaurantsByLatLong,
  getRestaurantsByCity,
} = require('../controllers/Restaurant');

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get('/', getRestaurantsByLatLong);
router.get('/:city', getRestaurantsByCity);

// Exporting Modules
module.exports = router;
