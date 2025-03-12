const signRouter = require("./sign/sign.router.js");
const loginRouter = require("./login/login.router.js");
const express = require("express");

const {verifyToken} = require('../middleware/authJwt');
const api = express.Router();

api.use('/', signRouter);
api.use('/', loginRouter);


module.exports = api;
