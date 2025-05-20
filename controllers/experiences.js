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

// SHOW - GET /experiences/:id
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.render('experiences/show.ejs', { experience });
  } catch (err) {
    console.error(err);
    res.send("Error loading experience.");
  }
});


// ADD MEAL - POST /experiences/:id/meals
router.post('/:id/meals', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    experience.meals.push({
      name: req.body.name,
      description: req.body.description
    });
    await experience.save();
    res.redirect(`/experiences/${experience._id}`);
  } catch (err) {
    console.error(err);
    res.send("Error adding meal.");
  }
});

// EDIT - Show the edit form
router.get('/:id/edit', async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  res.render('experiences/edit.ejs', { experience });
});

// UPDATE - Handle edit form submit
router.put('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      dayOfWeek: req.body.dayOfWeek,
      mood: req.body.mood,
      music: req.body.music,
      ambiance: req.body.ambiance,
      playlistUrl: req.body.playlistUrl
    });
    res.redirect(`/experiences/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send('Error updating experience.');
  }
});

// DELETE - Remove an experience
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.redirect('/experiences');
  } catch (err) {
    console.error(err);
    res.send('Error deleting experience.');
  }
});

// DELETE a meal from an experience
router.delete('/:expId/meals/:mealId', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.expId);

    // Manually remove the meal by filtering it out
    experience.meals = experience.meals.filter(meal => meal._id.toString() !== req.params.mealId);

    await experience.save();
    res.redirect(`/experiences/${experience._id}`);
  } catch (err) {
    console.error(err);
    res.send('Error deleting meal.');
  }
});

// UPDATE a meal inside an experience
router.put('/:expId/meals/:mealId', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.expId);
    const meal = experience.meals.id(req.params.mealId);

    if (meal) {
      meal.name = req.body.name;
      meal.description = req.body.description;
      await experience.save();
    }

    res.redirect(`/experiences/${experience._id}`);
  } catch (err) {
    console.error(err);
    res.send('Error updating meal.');
  }
});

module.exports = router;

