//Import system packages
const express = require("express");

//Import Middleware
const isAuth = require("../middleware/is-auth");

//Declare router
const router = express.Router();

//Import Controllers
const movieController = require("../controllers/movie");

//Get movies
router.get("/movie/:movieId", isAuth, movieController.getMovie);

//Update watched status
router.put("/movie/:movieId", isAuth, movieController.updateMovie);

//Remove movie
router.delete("/movie/:movieId", isAuth, movieController.removeMovie);

//Add Movie
router.post("/movies", isAuth, movieController.addMovie);

module.exports = router;
