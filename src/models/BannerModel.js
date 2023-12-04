const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    url: { type: String, require: true },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
const BannerModel = mongoose.model("Banner", bannerSchema);
module.exports = BannerModel;
