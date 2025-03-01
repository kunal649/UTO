const express = require("express");
const { verifyToken } = require("../config/jwt");
const { getDB } = require("../services/mongo");

const patientsRouter = express.Router();

patientsRouter.get("/patient/:id", verifyToken, async (req, res) => {
  const { hospital_id, doctor_id } = req.user; // Extracted from JWT

  try {
    const db = getDB();
    const patient = await db
      .collection("patients")
      .findOne({ patient_id: req.params.id });

    if (!patient) return res.status(404).json({ message: "Patient not found" });
    
    await db.collection("patients").updateOne(
      { patient_id: req.params.id },
      {
        $push: {
          access_log: {
            hospital: hospital_id,
            doctor: doctor_id,
            timestamp: new Date(),
          },
        },
      }
    );

    res.json(patient.records);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Add Patient Record
patientsRouter.post(
  "/patient/:id/add-record",
  verifyToken,
  async (req, res) => {
    const { hospital_id, doctor_id } = req.user;
    const { condition, prescription, lab_reports } = req.body;

    try {
      const db = getDB();
      const newRecord = {
        date: new Date().toISOString().split("T")[0],
        hospital: hospital_id,
        doctor: doctor_id,
        condition,
        prescription,
        lab_reports,
      };

      const result = await db
        .collection("patients")
        .updateOne(
          { patient_id: req.params.id },
          { $push: { records: newRecord } }
        );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Patient not found" });
      }

      res.json({ message: "Record added successfully" });
    } catch (error) {
      console.error("Error adding patient record:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

module.exports = patientsRouter;
