const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// MongoDB Atlas Boilerplate
// Can change <user>:<password>
// Can change mongodb.net/>database>
const uri =
  "mongodb+srv://stevenshow:xp7tsvhxIXG4DCLs@memes.w8fh1.mongodb.net/Facts?retryWrites=true&w=majority";
const conenctionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, conenctionParams)
  .then(() => {
    console.info("Connected to the database!");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Actual routes to be handled
const memeRoutes = require("./api/meme/memes");
const factRoutes = require("./api/fact/facts");

// Used for logging
app.use(morgan("dev"));
// Handles parsing the body when JSON is sent
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO Causes request to hang
// app.use((req, res, next) => {
//   // Who can access the API
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Origin, X-Requested-With, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     // What methods you want your API to support
//     res.header("Access-Control-Allow-Methods", "GET, POST");
//     return res.status(200).json({});
//   }
// });

app.use("/memes", memeRoutes);
app.use("/facts", factRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Would handle if an error was immediately thrown from a DB issue
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
