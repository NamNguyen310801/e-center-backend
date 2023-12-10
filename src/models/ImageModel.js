const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    type: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const ImageModel = mongoose.model("Image", imageSchema);
module.exports = ImageModel;
