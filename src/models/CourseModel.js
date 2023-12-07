const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    price: { type: Number },
    thumbnail: { type: String },
    discount: { type: Number },
    description: { type: String },
    slug: { type: String },
    studentsCount: { type: Number },
    isPro: { type: Boolean },
    isComingSoon: { type: Boolean },
    isSelling: { type: Boolean },
    isCompletable: { type: Boolean },
    rating: { type: Number, default: 0 },
    tracks: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        title: { type: String },
        isFree: { type: Boolean },
        position: { type: Number },
        trackSteps: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lesson",
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
