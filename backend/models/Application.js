const mongoose = require("mongoose");

// Assuming you want to reference the 'Tutor' collection
const applicationSchema = new mongoose.Schema({
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",  
    required: true,
  },
  subject: String,
  resume: {
    data: Buffer,
    contentType: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Application", applicationSchema);
