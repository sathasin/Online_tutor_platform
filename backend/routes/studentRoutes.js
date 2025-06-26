const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const  upload = require("../middleware/uploadImage");

// ✅ Get student profile by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("subjects");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student profile", error: err.message });
  }
});

// ✅ Update student profile (name, bio, profilePic)
router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, bio } = req.body;
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = name || student.name;
    student.bio = bio || student.bio;

    if (req.file) {
      student.profilePic = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await student.save();
    res.json({ message: "Profile updated", student });
  } catch (err) {
  
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
});

// ✅ Add subject to student
router.put("/:id/subjects", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const subject = await Subject.findById(req.body.subjectId);

    if (!student || !subject) {
      return res.status(404).json({ message: "Student or Subject not found" });
    }
 
    // Add subject to student's subjects array
    student.subjects.push(subject._id);
    await student.save();

    // Add student to subject's students array
    subject.studentIds.push(student._id);
    await subject.save();

    res.json({ message: "Subject added successfully", student, subject });
  } catch (err) {
  
    res.status(500).json({ message: "Failed to add subject", error: err.message });
  }
});

module.exports = router;
