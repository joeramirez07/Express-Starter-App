const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  mood: { type: String, required: true },        // e.g. Chill, Energetic
  music: { type: String, required: true },       // e.g. Lo-fi, Soul, Jazz
  ambiance: { type: String, required: true },    // e.g. Candlelight, Patio Vibes
  playlistUrl: { type: String },                 // optional Spotify or IG link
  notes: { type: String },                       // optional extra line like: “Try the sangria” or “DJ at 8”
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Experience', experienceSchema);
