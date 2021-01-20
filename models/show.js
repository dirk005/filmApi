const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema(
  {
    showId: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    episodes: [
        {
          type: Schema.Types.ObjectId,
          ref: "Episode",
        },
      ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);
