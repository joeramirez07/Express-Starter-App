require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");

// Set the port
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Auth middleware to add user to req/res.locals
app.use(require("./middleware/add-user-to-req-and-locals"));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.use("/auth", require("./controllers/auth"));

app.use('/experiences', require('./controllers/experiences'));


const Experience = require('./models/experience');

const seed = async () => {
  const count = await Experience.countDocuments();
  if (count === 0) {
    await Experience.create({
      title: "Monday House Vibes",
      dayOfWeek: "Monday",
      mood: "Energetic",
      music: "House",
      ambiance: "Loud, neon lighting, upbeat",
      playlistUrl: "https://open.spotify.com/playlist/fakeurl",
      meals: []
    });
    console.log('🌱 Seeded one test experience!');
  }
};

seed();


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
