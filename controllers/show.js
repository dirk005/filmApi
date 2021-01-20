//Import Modules
const Show = require("../models/show");
const User = require("../models/user");

//Import helper functions
const { throwError, catchError } = require("../util/hellper");

//Get show
exports.getShow = async (req, res, next) => {
  const showId = req.params.showId;
  const userId = req.userId;

  try {
    const show = await Show.findOne({ showId: showId, user: userId });
    if (!show) {
      throwError("Could not find show", 404);
    }
    res.status(201).json({ message: "Show found successfully", gotShow: true });
  } catch (err) {
    catchError(err, next);
  }
};

//add a new show to the list
exports.addShow = async (req, res, next) => {
  const showId = req.body.showId;
  const userId = req.userId;

  const show = new Show({
    showId: showId,
    user: userId,
  });

  try {
    await show.save();
    const user = await User.findById(userId);
    user.shows.push(show);
    await user.save();
    res.status(201).json({ message: "Show added successfully", show: show });
  } catch (err) {
    catchError(err, next);
  }
};

//Remove movie from list
exports.removeShow = async (req, res, next) => {
  const showId = req.body.showId;
  const userId = req.userId;

  try {
    const show = await Show.findOne({ showId: showId, user: userId });
    if (!show) {
      throwError("Could not find movie", 404);
    }
    const showDbId = show._id.toString();
    await Show.findByIdAndRemove(showDbId);
    const user = await User.findById(userId);
    user.shows.pull(showDbId);
    await user.save();
    res.status(200).json({ message: "Show removed successfully" });
  } catch (err) {
    catchError(err, next);
  }
};
