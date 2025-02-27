require("dotenv").config();
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = require("./app");

const PORT = process.env.PORT || 5000;

passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret:"",
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      // user profile ko database m save kr <here>
      done(null, profile); 
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
