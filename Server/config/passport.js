const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.js");
const { ObjectId } = require("mongodb");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDB();
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const user = await User.create                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            password: null,
            role: "user",
          });

          user = await db
            .collection("users")
            .findOne({ _id: result.insertedId });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

const googleAuthenticator = passport.authenticate("google", {
  scope: ["profile", "email"],
});
const googleCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
    if (err || !user) {
      return res.redirect("/");
    }

    req.login(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      return res.redirect("http://localhost:5143");
    });
  })(req, res, next);
};

// 🔹 Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // Ensure `_id` is stored as a string
});

// 🔹 Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = {
  passport,
  googleAuthenticator,
  googleCallback,
};
