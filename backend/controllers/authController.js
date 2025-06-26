const User = require("../models/User");
const bcrypt = require("bcryptjs"); 
const Student = require("../models/Student"); // Assuming you have a Student model

const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store student info
    const student = new Student({
      name,
      email,
      profilePic: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });
    await student.save();

    // Store user credentials
    const user = new User({
      email,
      password: hashedPassword,
      role: "student",
      studentId: student._id,
    });
    await user.save();

    res.status(201).json({ message: "Student registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
    console.error(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: `${role} logged in successfully`, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


module.exports = { loginUser, signupUser };
