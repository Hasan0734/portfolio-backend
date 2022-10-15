const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// schem import

const registerSchema = require("../schema/registerSchema");
const isAdmin = require("../auth/auth");
const Admin = new mongoose.model("Admin", registerSchema);

const saltRounds = 5;

// get all data

router.get("/admins", async (req, res) => {
  const admins = await Admin.find().select({ pass: 0, __v: 0 });
  res.send(admins);
});

// registe admin
router.post("/register", async (req, res) => {
  const { firstName, lastName, phone, email, pass, confirmPass } = req?.body;
  const hashPass = await bcrypt.hashSync(pass, saltRounds);
  const admin = await Admin.findOne({ email: email });
  if (!admin) {
    if (confirmPass) {
      if (bcrypt.compareSync(confirmPass, hashPass)) {
        const newAdmin = new Admin({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          pass: hashPass,
        });
        await newAdmin.save((err) => {
          if (err) {
            // console.log(err);
            res
              .status(500)
              .json({ success: false, error: "There was a serve side error!" });
          } else {
            res
              .status(200)
              .json({ success: true, message: "Register successful" });
          }
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Confrim Passwrod not matched with password ",
        });
      }
    } else {
      res.status(500).json({
        success: false,
        error: "Confirm Password word Required",
      });
    }
  } else {
    res.status(500).json({
      success: false,
      error: "Already register",
    });
  }
});

// login admin

router.post("/login", async (req, res) => {
  const { email, password } = req?.body;
  if (email && password) {
    const admin = await Admin.findOne({ email: email });
    if (admin) {
      if (bcrypt.compareSync(password, admin.pass)) {
        const token = jwt.sign(
          {
            _id: admin._id,
            email: admin.email,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          success: true,
          token: token,
          admin: {
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            phone: admin.phone,
          },
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Not found",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error: "Not found",
      });
    }
  }

  // const matchedPass = bcrypt.compareSync(confirmPass, hashPass);
  // if (matchedPass) {

  // }
});

module.exports = router;
