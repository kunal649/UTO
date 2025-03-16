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
        console.log("Google Profile Data Received:", profile); //log
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            password: null,
          });
          await user.save();
          console.log("User created : ", user); //log
        }
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        console.log("Token created : ", token); //log
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
      console.log("Error in google callback: ", err); // log
      return res.redirect("http://localhost:5173/login?error=true");
    }
    console.log("Authenticated User Data:", data); //log

    res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.redirect("http://localhost:5173");
  })(req, res, next);
};

const googleAuthorized = (req, res) => {
  console.log("Google Authorized");
  res.json({ message: "Google Authorized" });
};

module.exports = {
  googleAuthenticator,
  googleCallback,
  googleAuthorized,
};

//All logs checked :)
