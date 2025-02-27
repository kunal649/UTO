const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const authRouter = require("./routes/auth");
const patientsRouter = require("./routes/patient.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(patientsRouter); // Add this


module.exports = app;
