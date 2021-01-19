//Import Modules
const Movie = require("../models/movie");
const User = require("../models/user");

//Import helper functions
const { throwError, catchError } = require("../util/hellper");

//Get movies
exports.getMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  const userId = req.userId;
  try {
    const movie = await Movie.findOne({ movieId: movieId, user: userId });
    if (!movie) {
        throwError("Could not find movie", 404);;
    }
    res
      .status(201)
      .json({ message: "Movie found successfully", watched: movie.watched });
  } catch (err) {
    catchError(err, next);
  }
};

exports.updateMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  const userId = req.userId;

  try {
    const movie = await Movie.findOne({ movieId: movieId, user: userId });
    const watched = movie.watched;
    movie.watched = !watched;
    await movie.save();
    res
      .status(201)
      .json({ message: "Movie updated successfully", watched: movie.watched });
  } catch (err) {
    catchError(err, next);
  }
};

//add a new movie to the list
exports.addMovie = async (req, res, next) => {
  const movieId = req.body.movieId;
  const userId = req.userId;

  const movie = new Movie({
    movieId: movieId,
    watched: false,
    user: userId,
  });

  try {
    await movie.save();
    const user = await User.findById(userId);
    user.movies.push(movie);
    await user.save();
    res.status(201).json({ message: "Movie added siccessfully", movie: movie });
  } catch (err) {
    catchError(err, next);
  }
};

exports.removeMovie = async (req, res, next) => {
  const movieId = req.params.movieId;
  const userId = req.userId;

  try {
    const movie = await Movie.findOne({ movieId: movieId, user: userId });
    if (!movie) {
      throwError("Could not find movie", 404);
    }
    const movieDbId = movie._id.toString();
    await Movie.findByIdAndRemove(movieDbId);
    const user = await User.findById(userId);
    user.movies.pull(movieDbId);
    await user.save();
    res.status(200).json({ message: "Movie removed successfully" });
  } catch (err) {
    catchError(err, next);
  }
};
