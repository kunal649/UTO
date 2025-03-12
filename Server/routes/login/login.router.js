const express = require("express");

const userLogin = require("./login.controller");

const loginRouter = express.Router();

loginRouter.post("/login", userLogin);

loginRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = loginRouter;
