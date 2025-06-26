// backend/middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // Store in memory as Buffer
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed"), false);
  },
});

module.exports = upload;
