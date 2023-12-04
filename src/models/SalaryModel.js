const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  basicSalary: { type: Number },
  bonusSalary: { type: Number },
});
const SalaryModel = mongoose.model("Salary", salarySchema);
module.exports = SalaryModel;
