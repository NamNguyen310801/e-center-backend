const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    url: { type: String, require: true },
    type: { type: String, default: "teacher" },
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
