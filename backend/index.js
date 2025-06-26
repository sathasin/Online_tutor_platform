const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

// Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/application", require("./routes/applicationRoutes")); 
app.use("/api/tutor", require("./routes/tutorRoutes"));


app.use("/api/subject", require("./routes/subjectRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
