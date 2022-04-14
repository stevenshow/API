// should return a meme upon request
const express = require("express");
const router = express.Router();

// Handle Get Request for general meme
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Getting meme for your pleasure",
  });
});

// Handle Get Request for specific type of meme
router.get("/:type", (req, res, next) => {
  const type = req.params.type;
  res.status(200).json({
    message: `Getting ${type} meme for you!`
  })
});

module.exports = router;
