// Importing modules
const express = require('express');
// Importing Middleware
const authorizeJWT = require('../middleware/jwt');
const { findStreetFood } = require('../controllers/openFastFood');

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get('/:cityName', findStreetFood);

// Exporting Modules
module.exports = router;
