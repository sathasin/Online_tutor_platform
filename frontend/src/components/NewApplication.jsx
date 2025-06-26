import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./NewApplication.css"; // You can create and style this file

const NewApplication = ({ onClose }) => {
  const [subject, setSubject] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tutorId = Cookies.get("tutorId");
    if (!tutorId) return alert("Tutor not logged in.");

    const formData = new FormData();
    formData.append("tutorId", tutorId);
    formData.append("subject", subject);
    if (resume) formData.append("resume", resume);

    try {
      const res = await axios.post("http://localhost:5000/api/application", formData);
      alert(res.data.message);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Application failed.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Apply for a New Subject</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            required
          />
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
          />
          <div className="modal-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewApplication;
