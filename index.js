// Importing modules
const express = require("express");
const cors = require("cors");
const db = require("./connection");
var cron = require("node-cron");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocs = require('./utils/swagger.json');
// Initializing an express app
const app = express();

// Server Port
const PORT = 8000;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Just a function running every 10 minutes so the server doesnt sleep on render
cron.schedule("*/10 * * * *", () => {
  console.log("Cron job running every 10 minutes");
});
// Importing Routes
const authRoute = require("./routes/auth");
const placesRoute = require("./routes/places");
const weatherRoute = require("./routes/Weather");
const restaurantRoute = require("./routes/Restaurant");
const hotelRoute = require("./routes/hotels");
const streetFoodRoute = require("./routes/streetFood");
const userRoute = require("./routes/user");
const transportRoute = require("./routes/transport");

// Routes
app.use("/api/auth", authRoute);
app.use("/api/places", placesRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/streetFood", streetFoodRoute);
app.use("/api/user", userRoute);
app.use("/api/transport", transportRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// require("./utils/swagger")(app, PORT);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Error Handling for Multer
// app.use((error, req, res, next) => {
//   console.log('This is the rejected field ->', error.field);
// });

// Listening on the port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
