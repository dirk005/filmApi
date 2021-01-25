//Import system packages
const express = require("express");

//Import Middleware
const isAuth = require("../middleware/is-auth");

//Declare router
const router = express.Router();

//Import Controllers
const showController = require("../controllers/show");

//Get show
router.get("/show/:showId", isAuth, showController.getShow);

router.get("/shows/", isAuth, showController.getShows);

//Remove movie
router.delete("/show/:showId", isAuth, showController.removeShow);

//Add Movie
router.post("/show", isAuth, showController.addShow);

module.exports = router;
