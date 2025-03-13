const express = require("express");

const { verifyToken } = require("../../middleware/jwt.js");
const {
  googleAuthenticator,
  googleCallback,
} = require("../../config/passport.js");

const userSignup = require("./sign.controller.js");

const signRouter = express.Router();

signRouter.get("/google", googleAuthenticator);

signRouter.get("/google/callback", googleCallback);

signRouter.post("/Signup", userSignup);

signRouter.get("/user", verifyToken, (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Cookies:", req.cookies);
  console.log("Authorization:", req.headers.authorization);
  res.json({ user: req.user });
});

module.exports = signRouter;
