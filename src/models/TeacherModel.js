const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  google: { type: String },
  youtube: { type: String },
  salaryList: [
    {
      type: { type: Number, default: 1 },
      amountSalary: { type: Number },
      description: { type: String },
      status: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
