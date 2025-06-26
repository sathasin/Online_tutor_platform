const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/Application");
const Tutor = require("../models/Tutor");
const upload = multer(); // For parsing multipart/form-data
const Subject = require("../models/Subject");

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { tutorId, subject } = req.body;
    
    const newApp = new Application({
      tutorId,
      subject,
      resume: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });
    await Tutor.findByIdAndUpdate(tutorId, {
      $push: { applicationIds: newApp._id },
    });
    await newApp.save();
    res.status(201).json({ message: "Application submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error submitting application", error: err.message });
    console.error(err);
  }
});

module.exports = router;


// Route to get all applications (for Admin)
router.get("/all", async (req, res) => {
  try {
    const applications = await Application.find().populate("tutorId", "name email");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch applications", error: err.message });
  }
});

router.get("/tutor/:tutorId", async (req, res) => {
  try {
    const applications = await Application.find({ tutorId: req.params.tutorId });
    res.json({ applications });
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications", error: err.message });
  }
});

// backend/routes/application.js
router.get("/resume/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application || !application.resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.setHeader("Content-Type", application.resume.contentType);
    res.setHeader("Content-Disposition", "inline"); // View in browser
    res.send(application.resume.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching resume", error: err.message });
  }
});


// Route to approve or reject an application (for Admin)
router.put("/:id/approve", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Not found" });

    application.status = "approved";
    await application.save();

    // Create subject on approval
    const newSubject = new Subject({
      tutorId: application.tutorId,
      subjectName: application.subject,
      studentIds: [],
    });
    await newSubject.save();

    // 👉 Add subject _id to tutor's classes array
    await Tutor.findByIdAndUpdate(
      application.tutorId,
      { $push: { classes: newSubject._id } },
      { new: true }
    );

    res.json({ message: "Approved, subject created & added to tutor", subject: newSubject });
  } catch (err) {
    res.status(500).json({ message: "Approve failed", error: err.message });
  }
});

router.put("/:id/reject", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: "Not found" });

    application.status = "rejected";
    await application.save();

    res.json({ message: "Rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Reject failed", error: err.message });
  }
});


module.exports = router;
