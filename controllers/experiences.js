const express = require("express");
const router = express.Router();
const Experience = require("../models/experience");


router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find({});

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const grouped = {};

    days.forEach((day) => {
      grouped[day] = experiences.filter((exp) => exp.dayOfWeek === day);
    });

    res.render("experiences/index.ejs", { grouped, user: req.session.user });
  } catch (err) {
    console.error(err);
    res.send("Error loading experiences.");
  }
});


router.get("/new", (req, res) => {
  res.render("experiences/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const newExperience = new Experience({
      title: req.body.title,
      venue: req.body.venue,
      dayOfWeek: req.body.dayOfWeek,
      mood: req.body.mood,
      music: req.body.music,
      ambiance: req.body.ambiance,
      playlistUrl: req.body.playlistUrl,
      notes: req.body.notes,
      user: req.session.userId,
    });
    await newExperience.save();
    res.redirect("/experiences");
  } catch (err) {
    console.error(err);
    res.send("Error creating experience.");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.render("experiences/show.ejs", { experience });
  } catch (err) {
    console.error(err);
    res.send("Error loading experience.");
  }
});


router.get("/:id/edit", async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  res.render("experiences/edit.ejs", { experience });
});


router.put("/:id", async (req, res) => {
  try {
    await Experience.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      venue: req.body.venue,
      dayOfWeek: req.body.dayOfWeek,
      mood: req.body.mood,
      music: req.body.music,
      ambiance: req.body.ambiance,
      playlistUrl: req.body.playlistUrl,
      notes: req.body.notes,
    });
    res.redirect(`/experiences/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send("Error updating experience.");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.redirect("/experiences");
  } catch (err) {
    console.error(err);
    res.send("Error deleting experience.");
  }
});

module.exports = router;
