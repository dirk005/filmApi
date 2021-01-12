//Import packages 
const mongoose = require("mongoose");

// Create schema
const Schema = mongoose.Schema;

// Set up user Schema with name,email and password
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//Export user schema (this will create the user table if it does not exists)
module.exports = mongoose.model('User', userSchema);