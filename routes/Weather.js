// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const { getCurrent } = require("../controllers/Weather");

// Initializing router
const router = new express.Router();

// router.post("/access-token", signup);
router.get("/currentweather/", getCurrent);

// Exporting Modules
module.exports = router;
