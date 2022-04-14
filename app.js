const express = require("express");
const app = express();
const morgan = require("morgan");

const memeRoutes = require("./api/meme/memes");

// Used for logging
app.use(morgan("dev"));

app.use((req, res, next) => {
  // Who can access the API
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    // What methods you want your API to support
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }
});

app.use("/memes", memeRoutes);

app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status= 404;
  next(error);
});

// Would handle if an error was immediately thrown from a DB issue
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

module.exports = app;
