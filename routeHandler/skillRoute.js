const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const isAdmin = require("../auth/auth");

// new schema
const skillSchema = require("../schema/skillSchema");
const Skill = new mongoose.model("Skill", skillSchema);


// add skill
router.use(isAdmin).post("/skill", async (req, res) => {
  const { name, percent } = req.body;
  try {
    const alreadySkill = await Skill.findOne({ name: name });
    if (!alreadySkill) {
      const newSkill = new Skill({
        name: name,
        percent: percent,
      });

      await newSkill.save((err) => {
        if (err) {
          res.status(500).json({
            success: false,
            error: "Internal server error!",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Skill added successfully",
          });
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Already Added",
      });
    }
  } catch (err) {
    console.log(err, "catch");
    res.status(500).json({
      success: true,
      message: "Internal Server error!",
    });
  }
});


router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find().select({ __v: 0 });
    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal Server error!",
    });
  }
});

module.exports = router;
