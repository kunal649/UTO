const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { getDB } = require("../services/mongo");
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
        let user = await db.collection("users").findOne({ email: profile.emails[0].value });

        if (!user) {
          const result = await db.collection("users").insertOne({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          });

          user = await db.collection("users").findOne({ _id: result.insertedId });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

async function googleAuthenticator(passport) {
  passport.authenticate("google", { scope: ["profile", "email"] });
}

async function googleCallback(passport) {
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5143");
  }
};

// 🔹 Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id.toString()); // Ensure `_id` is stored as a string
});

// 🔹 Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = {
  passport, 
  googleAuthenticator,
  googleCallback
};
