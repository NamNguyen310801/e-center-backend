const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    step_id: { type: String },
    position: { type: Number },
    name: { type: String, require: true, unique: true },
    url: { type: String, require: true },
    thumbnail: { type: String },
    description: { type: String },
    isPublished: { type: Boolean },
  },
  {
    timestamps: true,
  }
);
const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
