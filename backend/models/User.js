const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("User", userSchema);
