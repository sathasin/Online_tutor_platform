const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

// ✅ Get all subjects
router.get("/all", async (req, res) => {
  try {
    const subjects = await Subject.find().populate("tutorId", "name email");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subjects", error: err.message });
  }
});

router.put('/:subjectId/start-call', async (req, res) => {
  const { subjectId } = req.params;
 
   meetingId = Math.random().toString(36).substring(2, 15);
  await Subject.findByIdAndUpdate(subjectId, { call: true, meetingId });
  res.json({ message: 'Call started', meetingId });
});

router.put('/:subjectId/end-call', async (req, res) => {
  const { subjectId } = req.params;
  await Subject.findByIdAndUpdate(subjectId, { call: false, meetingId: null });
  res.json({ message: 'Call ended' });
});

router.get('/:subjectId', async (req, res) => {
  const { subjectId } = req.params;
  try {
    const subject = await Subject.findById(subjectId).populate('tutorId', 'name email');
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (err) {
    console.error('Error fetching subject:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;