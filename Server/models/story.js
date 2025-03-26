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
  location: {
    type: String,
    required: true,
  },
  voiceId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  duration: {
    type: String,
    default: "0:30",
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});
const Story = mongoose.model("Story", storySchema);
module.exports = Story;
