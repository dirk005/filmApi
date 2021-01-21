const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema(
  {
    episodeId: {
      type: String,
      required: true,
    },
    showId: {
      type: String,
      required: true,
    },
    show: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", episodeSchema);
