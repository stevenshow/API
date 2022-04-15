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
router.get("/cat", (req, res, next) => {
  Fact.countDocuments('cat', (err, count) => {
    // Get a random entry
    let random = Math.floor(Math.random() * count);

    // give back random cat fact
    Fact.findOne().skip(random).then((fact) => {
      res.status(200).json({
        fact
      });
    })
    .catch((err) => {
      console.log(err)
    });
  });
});

// Handle posting new fact to database
router.post("/", (req, res, next) => {
  const { fact, reference, type } = req.body;
  
  // validate to make sure there is a fact, reference, and type present
  // TODO deeper validation on reference
  if (fact && reference && type) {
    const factToPost = new Fact({
      _id: new mongoose.Types.ObjectId(),
      fact: req.body.fact,
      reference: req.body.ref,
      type: req.body.type
  
    });
    factToPost.save()
    .then((result => {
      console.log(result)
      Fact.findById(result._id)
      .exec()
      .then((fact) => {
        console.log("FACT: ", fact)
      });
    }))
    .catch((err) => {
      console.log(err);
    });
    res.status(201).json({
      message: "Created Fact successfully!",
      fact: factToPost
    })
  } else {
      res.status(400).json({
        message: "Make sure all fields are present"
      })
  }

})

module.exports = router;
