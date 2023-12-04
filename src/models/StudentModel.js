const mongoose = require("mongoose");
const User = require("./UserModel");
// Định nghĩa mô hình StudentModel kế thừa từ UserModel
const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tuition: { type: String },
  klass: { type: String },
  course: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      learningIndex: { type: Number, default: 0 },
      percent: { type: Number, default: 0 },
      isStarted: { type: Boolean, default: false },
      isSuccess: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
  // Các trường dữ liệu khác của studentModel tùy theo cấu trúc của nó
  tuitionList: [
    {
      amountDay: { type: Number },
      amountFee: { type: Number },
      description: { type: String },
      status: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
