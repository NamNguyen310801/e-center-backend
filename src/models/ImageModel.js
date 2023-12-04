const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    url: { type: String, require: true },
    type: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);
const ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
