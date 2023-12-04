const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  course: { type: String },
});
const ClassModel = mongoose.model("Class", classSchema);
module.exports = ClassModel;
