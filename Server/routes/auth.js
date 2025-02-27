const express = require("express");
const authRouter = express.Router();
const passport = require("passport");

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect to discussion or any desired page
    res.redirect("http://localhost:5173/discussion"); // ill go for discussion
  }
);

// Get user endpoint
authRouter.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = authRouter;
