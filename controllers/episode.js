//Import Modules
const Episode = require("../models/episode");
const Show = require("../models/show");
const User = require("../models/user");

//Import helper functions
const { throwError, catchError } = require("../util/hellper");

//Get episodes
exports.getEpisode = async (req, res, next) => {
  const episodeId = req.params.episodeId;
  const showId = req.parmas.showId;
  const userId = req.userId;
  try {
    const episode = await Episode.findOne({
      episodeId: episodeId,
      showId: showId,
      user: userId,
    });
    if (!episode) {
      throwError("Could not find episode", 404);
    }
    res.status(201).json({
      message: "episode found successfully",
      watched: episode.watched,
    });
  } catch (err) {
    catchError(err, next);
  }
};

//add a new episode to the list
exports.addEpisode = async (req, res, next) => {
  const episodeId = req.body.episodeId;
  const showId = req.body.showId;
  const userId = req.userId;

  const episode = new Episode({
    episodeId: episodeId,
    watched: true,
    show: showId,
    user: userId,
  });

  try {
    await episode.save();
    const show = await Show.findOne({
      showId: showId,
      user: userId,
    });
    show.episodes.push(episode);
    await show.save();
    res
      .status(201)
      .json({ message: "episode added successfully", episode: episode });
  } catch (err) {
    catchError(err, next);
  }
};

//Remove episode from list
exports.removeEpisode = async (req, res, next) => {
  const episodeId = req.body.episodeId;
  const showId = req.body.showId;
  const userId = req.userId;

  try {
    const episode = await Episode.findOne({
      episodeId: episodeId,
      showId: showId,
      user: userId,
    });
    if (!episode) {
      throwError("Could not find episode", 404);
    }
    const episodeDbId = episode._id.toString();
    await Episode.findByIdAndRemove(episodeDbId);
    const show = await Show.findOne({
      showId: showId,
      user: userId,
    });
    show.episodes.pull(episodeDbId);
    await show.save();
    res.status(200).json({ message: "episode removed successfully" });
  } catch (err) {
    catchError(err, next);
  }
};
