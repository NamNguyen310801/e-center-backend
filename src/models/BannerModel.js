const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, require: true },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
const BannerModel = mongoose.model("Banner", bannerSchema);
module.exports = BannerModel;
