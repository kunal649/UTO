const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    default: null,
  },
  profilePic: { type: String },
});

module.exports = mongoose.model("User", userSchema);
