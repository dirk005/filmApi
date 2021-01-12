//Import Packages
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//Import Modules if needed
const User = require("../models/user");

//Import helper functions
const { throwError, catchError } = require("../util/hellper");

// Contorller to handle signup
exports.signup = (req, res, next) => {
  // Check if any errors has uccured while signing up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError("Signup Failed", 422, errors.array());
  }

  //Get values form request body
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Encrypt the password
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      // Create an user
      const user = new User({
        email: email,
        name: name,
        password: hashedPw,
      });

      return user.save(); // added user to database
    })
    .then((result) => {
      //Response if user added successfully
      res
        .status(201)
        .json({ message: "User created successfully", userId: result._id });
    })
    //Throw error if problem creating user
    .catch((err) => catchError(err, next));
};

exports.login = (req, res, next) => {
  // Check if any errors has uccured while signing up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwError("Signup Failed", 422, errors.array());
  }

  //Get values form request body
  const email = req.body.email;
  const password = req.body.password;

  // Setup user to send back
  let loadedUser;

  //Get user details
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throwError("No User Found", 404);
      }
      loadedUser = user;
      //comapre password entred with password on database
      return bcrypt.compare(password, user.password);
    })
    //Check if password match and return user detail
    .then((passwordMatch) => {
      if (!passwordMatch) {
        throwError("Passowrd does not match", 401);
      }
      
      res.status(200).json({ userId: loadedUser._id.toString(), userData:loadedUser });
    })
    //Throw error if problem creating user
    .catch((err) => catchError(err, next));
};
