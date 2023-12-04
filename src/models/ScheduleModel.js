const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    nameClass: { type: String, require: true },
    dayOfWeek: { type: String, require: true },
    caHoc: { type: String, require: true },
    time: { type: String, require: true },
    teacher: { type: String, require: true },
    monHoc: { type: String },
  },
  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
