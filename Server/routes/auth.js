const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../config/jwt");
const User = require("../models/user");
const googleAuthenticator = require("../config/passport");
const googleCallback = require("../config/passport");
const userSignup = require("../controllers/user.controller");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const users = [];

router.get("/google", googleAuthenticator);

router.get("/google/callback", googleCallback);

router.post("/Signup", userSignup);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, "SECRET_KEY", {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ user: { id: user.id, email: user.email }, token });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.get("/user", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
