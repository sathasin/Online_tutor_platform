const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../controllers/authController");
const User = require("../models/User"); // Import User model
const uploadImage = require("../middleware/uploadImage");
router.post("/login", loginUser);
router.post("/signup", uploadImage.single("profilePic"), signupUser);


// ✅ NEW route to check admin
router.post("/check-admin", async (req, res) => {
  try {
    // Log the request body for debugging
    const userId = req.body.userId; // assumes cookie has userId
    if (!userId) return res.json({ isAdmin: false });

    const user = await User.findById(userId);
    if (!user) return res.json({ isAdmin: false });

    if (user.role === "admin") {
      return res.json({ isAdmin: true });
    } else {
      return res.json({ isAdmin: false });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ isAdmin: false });
  }
});

module.exports = router;
