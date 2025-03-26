const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const Story = require("../../models/story.js");
const aiService = require("../../services/aiService.js");

const discussionRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Only audio files are allowed."));
    }
  },
});

discussionRouter.post(
  "/process-audio",
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file provided" });
      }

      const audioFile = req.file.path;
      const selectedVoice = req.body.voiceId;
      const location = req.body.location || "Unknown Location";

      const transcription = await aiService.transcribeAudio(audioFile);

      const cleanedTranscription = await aiService.cleanTranscription(
        transcription
      );

      const audioUrl = await aiService.uploadToCloud(audioFile);

      const title = await aiService.generateTitle(cleanedTranscription);
      const category = await aiService.detectCategory(cleanedTranscription);

      const story = new Story({
        title,
        audioUrl,
        transcription: cleanedTranscription,
        location,
        voiceId: selectedVoice,
        category,
        duration: "0:30", // using default duration fn/ will update it later
      });

      await story.save();
      fs.unlinkSync(audioFile);

      res.json(story);
    } catch (error) {
      console.error("Error processing audio:", error);
      res.status(500).json({ error: "Failed to process audio" });
    }
  }
);

discussionRouter.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ recordedAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

discussionRouter.post("/stories/id:/like", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    story.likes += 1;
    await story.save();
    res.json(story);
  } catch (error) {
    console.error("Error liking story:", error);
    res.status(500).json({ error: "Failed to like story" });
  }
});

module.exports = discussionRouter;
