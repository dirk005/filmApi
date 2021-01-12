// Import packages to use
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Import Routes
const userRoutes = require('./routes/user');

// Use express on app
const app = express();

// Pharse body data to json
app.use(bodyParser.json());

// Allow access to origin 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//Use routes
app.use('/user',userRoutes);

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
    "mongodb+srv://dirk:EpgcTCkCNHuzx6j@cluster0.mlikz.mongodb.net/filmtv?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
