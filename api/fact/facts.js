// should return a fact upon request
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fact = require("../../models/facts");

// Handle Get Request for general fact
router.get("/", (req, res, next) => {
  Fact.find()
    .exec()
    .then((facts) => {
      console.log(facts);
      res.status(200).json(facts);
    });
});

// Handle Get Request for specific type of fact
router.get("/:type", (req, res, next) => {
  const type = req.params.type;
  res.status(200).json({
    message: `Getting ${type} fact for you!`,
  });
});

router.post("/", (req, res, next) => {
  const fact = new Fact({
    _id: new mongoose.Types.ObjectId(),
    fact: req.body.fact,
    reference: req.body.ref,
    type: req.body.type

  });
  fact.save()
  .then((result => {
    console.log(result)
    Fact.findById(result._id).exec().then((fact) => {
      console.log("FACT: ", fact)
    });
  }))
  .catch((err) => {
    console.log(err);
  });
  res.status(201).json({
    message: "Created Fact successfully!",
    fact: fact
  })
})

module.exports = router;
