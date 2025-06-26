// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: { type: String, default: "" }, // new field
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }], 
});

module.exports = mongoose.model("Student", studentSchema);
