const mongoose = require("mongoose");

const tuitionSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    fee: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);
const Tuition = mongoose.model("Tuition", tuitionSchema);
module.exports = Tuition;
