const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  venue: String,
  dayOfWeek: String,
  mood: String,
  music: String,
  ambiance: String,
  playlistUrl: String,
  notes: String,
  meals: [mealSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
