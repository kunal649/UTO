const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/auth.js");
const patientsRouter = require("./routes/patient.js");
const loginRouter = require("./routes/login.js");

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

// Use routes only after DB is connected
app.use(loginRouter);
app.use("/auth", router);
app.use(patientsRouter);

module.exports = app;
