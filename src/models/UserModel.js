const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: Number, default: 3 },
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    date: { type: String },
    avatar: { type: String },
    coverImage: { type: String },
    intro: { type: String },
    gender: { type: String },
    tempSecret: { type: String },
    tempSecretExpiration: { type: Number },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
