// Import Packeages to use
const express = require("express");
const { body } = require("express-validator");

//Import controllers
const userController = require("../controllers/user");

//Import Middleware
const isAuth = require("../middleware/is-auth");

// Import Modole information if needed
const User = require("../models/user");

//Setup router
const router = express.Router();

//set routes to listen to

//Signup This will handle the signing the user up to the database
router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email Address already exists");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
    body("name").trim().not().isEmpty(),
  ],
  userController.signup
);

//Login this logs the user in to account
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid Email.")
      .normalizeEmail(),
  ],
  userController.login
);

module.exports = router;
