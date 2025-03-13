const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/v1/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            password: null,
          });
          await user.save();
        }
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
const googleAuthenticator = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
};
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, data) => {
    if (err || !data) {
      return res.redirect("http://localhost:5173");
    }
    res.cookie("token", data.token, { httpOnly: true, secure: false });
    return res.redirect("http://localhost:5173");
  })(req, res, next);
};
module.exports = {
  googleAuthenticator,
  googleCallback,
};
