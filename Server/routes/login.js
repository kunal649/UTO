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
