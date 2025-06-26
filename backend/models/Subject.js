const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true },
  subjectName: { type: String, required: true },
  studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  call: { type: Boolean, default: false },
  meetingId: { type: String, default: null },

});

module.exports = mongoose.model("Subject", subjectSchema);
