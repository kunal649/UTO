const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aiService = require("../services/aiService");
const Story = require("../../models/story");

const discussionRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("audio/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an audio file! Please upload an audio file."), false);
    }
  },
});

// Process audio and create story
discussionRouter.post(
  "/process-audio",
  upload.single("audio"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No audio file uploaded" });
      }

      const { transcription, isAnonymous, voiceId } = req.body;
      const isAnonymousBool = isAnonymous === "true";

      // Process audio (direct or anonymous)
      const audioUrl = await aiService.processAudio(
        req.file.buffer,
        isAnonymousBool,
        voiceId
      );

      // Generate title and detect category
      const title = await aiService.generateTitle(transcription);
      const category = await aiService.detectCategory(transcription);

      // Create new story
      const story = new Story({
        title,
        audioUrl,
        transcription,
        voiceId: isAnonymousBool ? voiceId : "original",
        category,
        duration: "0:30", // You might want to calculate this from the audio file
      });

      await story.save();

      // Clean up uploaded file
      await fs.promises.unlink(req.file.path);

      res.status(201).json(story);
    } catch (error) {
      console.error("Error processing audio:", error);
      res.status(500).json({ error: "Failed to process audio" });
    }
  }
);

// Get all stories
discussionRouter.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find().sort({ recordedAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error("Error fetching stories:", error);
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

// Like a story
discussionRouter.post("/stories/:id/like", async (req, res) => {
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
