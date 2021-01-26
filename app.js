// Import packages to use
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();

//Import Routes
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");
const showRoutes = require("./routes/show");
const episodeRoutes = require("./routes/episode");

// Use express on app
const app = express();

// Allow access to origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  next();
});

// use hemet
app.use(helmet());

// Pharse body data to json
app.use(bodyParser.json());

//Use routes
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/show", showRoutes);
app.use("/episode", episodeRoutes);

//Handel errors that are thrown
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const errors = error.data;
  res.status(status).json({
    message: message,
    errors: errors,
  });
});

// Connect to mongodb database and start server
mongoose
  .connect(
    `mongodb+srv://dirk:${process.env.MONGODB_KEY}@cluster0.mlikz.mongodb.net/filmtv?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => console.log(err));
