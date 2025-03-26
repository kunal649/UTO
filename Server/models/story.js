const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  transcription: {
    type: String,
    required: true,
  },
});
