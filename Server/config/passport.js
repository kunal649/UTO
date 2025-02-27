const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { getDB } = require("../services/mongo");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = getDB();
        let user = await db
          .collection("users")
          .findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await db.collection("users").insertOne({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
