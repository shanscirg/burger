const express = require("express");
const burger = require("../models/burger.js");
const router = express.Router();


router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  burger.selectAll(function (data) {
    const hbsObject = {
      burgers: data
    };
    console.log(hbsObject)
    res.render("index", hbsObject);
  });
});

router.post("/burgers/new", function (req, res) {
  burger.insertOne(req.body.burger_name, function (result) {
    // Send back the ID of the new quote
    console.log(result);
    res.redirect("/burgers");
  });
});

router.put("/api/burgers/:id", function (req, res) {
  burger.updateOne(req.params.id, function (result) {
    console.log("result", result);
    res.send(true).status(200);
  });
});

module.exports = router;