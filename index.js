// Importing modules
const express = require("express");
const cors = require("cors");
const db = require("./connection");
var cron = require("node-cron");
// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT || 5001;

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

// Routes
app.use("/api/auth", authRoute);

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Error Handling for Multer
// app.use((error, req, res, next) => {
//   console.log('This is the rejected field ->', error.field);
// });

// Listening on the port
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
