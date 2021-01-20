//Import system packages
const express = require("express");

//Import Middleware
const isAuth = require("../middleware/is-auth");

//Declare router
const router = express.Router();

//Import Controllers
const episodeController = require("../controllers/episode");

//Get movies
router.get("/episode/:episodeId/:showId", isAuth, episodeController.getEpisode);

//Remove movie
router.delete("/episode", isAuth, episodeController.removeEpisode);

//Add Movie
router.post("/episode", isAuth, episodeController.addEpisode);

module.exports = router;
