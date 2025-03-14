const bcrypt = require("bcrypt");
/* const express = require("express");
const jwt = require("jsonwebtoken");
const { getDB } = require("../services/mongo"); // Import DB

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
  const { hospital_id, doctor_id, password } = req.body;
  const db = getDB();

  const doctor = await db
    .collection("doctors")
    .findOne({ hospital_id, doctor_id });
  if (!doctor || doctor.password !== hash(password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ hospital_id, doctor_id }, "JWT_SECRET", {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = loginRouter; */

const jwt = require("jsonwebtoken");
const users = require("../../models/user");
const SECRET_KEY = process.env.JWT_SECRET;

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await users.findOne({ email });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "2h",
  });

  res.cookie("token", token, { httpOnly: true, secure: false });
  res.json({ user: { id: user.id, email: user.email }, token });
}

module.exports = userLogin;
