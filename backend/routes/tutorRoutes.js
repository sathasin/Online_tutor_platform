const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Tutor = require("../models/Tutor");
const User = require("../models/User");
const uploadImage = require("../middleware/uploadImage");
router.get("/all", async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tutors", error: err.message });
  }
});
// Accept multipart/form-data with profile picture
router.post("/signup", uploadImage.single("profilePic"), async (req, res) => {
  const { name, email, bio, languages, password } = req.body;

  try {
    // Check if the email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new tutor document
    const newTutor = new Tutor({
      name,
      email,
      bio,
      languages: JSON.parse(languages), // frontend must send languages as a JSON string
      password: hashedPassword,
      profilePic: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    // Save the new tutor to the database
    await newTutor.save();

    // Create a new user document for the login system
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "tutor",
      tutorId: newTutor._id, // Store the tutorId here
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "Tutor application submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error in submitting tutor application", error: err.message });
  }
});

// Route to retrieve tutor data
router.get("/:id", async (req, res) => {
  try {
    const tutor = await Tutor.findById(req.params.id);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }
    res.json({ tutor });
  } catch (err) {
    res.status(500).json({ message: "Error fetching tutor data", error: err.message });
  }
});


router.put("/update/:id", uploadImage.single("profilePic"), async (req, res) => {
  const { name, bio, languages } = req.body;
  const tutorId = req.params.id;

  try {
    // Find the tutor by ID
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    // Update the tutor fields
    tutor.name = name || tutor.name;
    tutor.bio = bio || tutor.bio;
    tutor.languages = languages ? JSON.parse(languages) : tutor.languages;

    // If there's a new profile picture, update it
    if (req.file) {
      tutor.profilePic = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Save the updated tutor
    await tutor.save();

    res.status(200).json({ message: "Tutor profile updated successfully", tutor });
  } catch (err) {
    res.status(500).json({ message: "Error updating tutor profile", error: err.message });
  }
});



module.exports = router;
