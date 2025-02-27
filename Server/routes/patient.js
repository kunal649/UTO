const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const patientsRouter = express.Router();

patientsRouter.get("/patients", (req, res) => {
  // Correct path to the Python script
  const pythonScriptPath = path.join(__dirname, "../python/generate_data.py");

  // Run the Python script
  const pythonProcess = spawn("python", [pythonScriptPath]);

  let dataString = "";

  pythonProcess.stdout.on("data", (data) => {
    dataString += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    try {
      res.json(JSON.parse(dataString)); // Send parsed JSON response
    } catch (error) {
      res.status(500).json({ error: "Failed to parse Python response" });
    }
  });
});

module.exports = patientsRouter;
