const signRouter = require("./sign/sign.router.js");
const loginRouter = require("./login/login.router.js");
const discussionRouter = require("./discussion/discussion.controller.js");
const express = require("express");

const api = express.Router();

api.use("/", signRouter);
api.use("/", loginRouter);
api.use("/", discussionRouter);

module.exports = api;
