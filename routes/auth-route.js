const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Products = require("../models/product");
const jwt = require("jsonwebtoken");

//REGISTER..//
router.post("/register", async (req, res) => {
  // Inside your route handler
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const users = new User({
      displayName: req.body.displayName,
      email: req.body.email,
      password: hashedPassword,
    });
    const data = await users.save();
    res.json({
      success: true,
      message: "Your account has been created successfully!",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use." });
    }
    res.status(400).json({ success: false, message: "Authentication failed" });
  }
});


//LOGIN..//
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // If credentials are valid, create a JWT token
    const token = jwt.sign({ userId: user._id }, "accessToken", {
      expiresIn: "1h", // You can customize the expiration time
    });
    const sanitizedRes = { ...user._doc };
    delete sanitizedRes.password;
    res.json({
      success: true,
      message: "Logged in successfully!",
      token,
      sanitizedRes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;


