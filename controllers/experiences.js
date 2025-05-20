const express = require('express');
const router = express.Router();
const Experience = require('../models/experience');

// INDEX - GET /experiences
router.get('/', async (req, res) => {
  const experiences = await Experience.find({});
  res.render('experiences/index.ejs', { experiences });
});

// NEW - GET /experiences/new
router.get('/new', (req, res) => {
  res.render('experiences/new.ejs');
});

// CREATE - POST /experiences
router.post('/', async (req, res) => {
  try {
    const newExperience = new Experience({
      title: req.body.title,
      dayOfWeek: req.body.dayOfWeek,
      mood: req.body.mood,
      music: req.body.music,
      ambiance: req.body.ambiance,
      playlistUrl: req.body.playlistUrl,
      user: req.session.userId, // only if logged in
      meals: []
    });
    await newExperience.save();
    res.redirect('/experiences');
  } catch (err) {
    console.error(err);
    res.send('Error creating experience.');
  }
});

module.exports = router;

