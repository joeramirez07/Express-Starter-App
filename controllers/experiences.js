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
      notes: req.body.notes,
      user: req.session.userId
    });
    await newExperience.save();
    res.redirect('/experiences');
  } catch (err) {
    console.error(err);
    res.send('Error creating experience.');
  }
});

// SHOW - GET /experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.render('experiences/show.ejs', { experience });
  } catch (err) {
    console.error(err);
    res.send('Error loading experience.');
  }
});

// EDIT - GET /experiences/:id/edit
router.get('/:id/edit', async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  res.render('experiences/edit.ejs', { experience });
});

// UPDATE - PUT /experiences/:id
router.put('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      venue:req.body.venue,
      dayOfWeek: req.body.dayOfWeek,
      mood: req.body.mood,
      music: req.body.music,
      ambiance: req.body.ambiance,
      playlistUrl: req.body.playlistUrl,
      notes: req.body.notes
    });
    res.redirect(`/experiences/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send('Error updating experience.');
  }
});

// DELETE - DELETE /experiences/:id
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.redirect('/experiences');
  } catch (err) {
    console.error(err);
    res.send('Error deleting experience.');
  }
});

module.exports = router;
