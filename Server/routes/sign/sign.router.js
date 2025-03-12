const express = require("express");

const { verifyToken } = require("../../config/jwt.js");
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
  res.json({ user: req.user });
});

module.exports = signRouter;
