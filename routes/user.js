// Importing modules
const express = require("express");
// Importing Middleware
const authorizeJWT = require("../middleware/jwt");
const { storeQuery } = require("../controllers/user");

// Initializing router
const router = new express.Router();

router.put("/store-query", authorizeJWT.verifyJWT, storeQuery);

// Exporting Modules
module.exports = router;
