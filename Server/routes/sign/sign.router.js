const express = require("express");
const { verifyToken } = require("../../middleware/jwt.js");
const GoogleAuthorizedUsers = require("../Auth/authcontroller.js");
const {
  googleAuthenticator,
  googleCallback,
  googleAuthorized,
} = require("../../config/passport.js");

const userSignup = require("./sign.controller.js");

const signRouter = express.Router();

signRouter.get("/google", googleAuthenticator);

signRouter.get("/google/callback", googleCallback);

signRouter.get("/google-authorized", googleAuthorized);

signRouter.post("/Signup", userSignup);

signRouter.get("/user", verifyToken, GoogleAuthorizedUsers);

module.exports = signRouter;
