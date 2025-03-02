const express = require("express");

const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/jwt");
const User = require("../models/user");
const googleAuthenticator = require("../config/passport");
const googleCallback = require("../config/passport");
const userSignup = require("../controllers/user.controller");
const userLogin = require("../routes/login");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const users = [];

router.get("/google", googleAuthenticator);

router.get("/google/callback", googleCallback);

router.post("/Signup", userSignup);

router.post("/login", userLogin);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/user", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
