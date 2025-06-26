// backend/models/Tutor.js
const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  bio: String,
  languages: [String],
  password: String,  // Don't forget to hash the password before storing
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  applicationIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    }
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",  // Future schema to manage each class
    }
  ]
});

module.exports = mongoose.model("Tutor", tutorSchema);
