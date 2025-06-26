import React, { useState } from "react";
import axios from "axios";
import "./ApplicationForm.css";
import { useNavigate } from "react-router-dom"; 
const ApplicationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState([]);
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const availableLanguages = ["English", "Spanish", "French", "German", "Chinese"];

  const handleCheckboxChange = (language) => {
    setLanguages((prev) =>
      prev.includes(language) ? prev.filter((lang) => lang !== language) : [...prev, language]
    );
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("languages", JSON.stringify(languages));
    formData.append("password", password);
    formData.append("profilePic", profilePic);

    try {
      const res = await axios.post("http://localhost:5000/api/tutor/signup", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit application.");
    }
  };

  return (
    <div className="application-form-container">
      <h2>Become a Tutor</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} required />
        <label>Languages:</label>
        <div className="language-checkbox-group">
          {availableLanguages.map((language) => (
            <label key={language}>
              <input
                type="checkbox"
                value={language}
                checked={languages.includes(language)}
                onChange={() => handleCheckboxChange(language)}
              />
              {language}
            </label>
          ))}
        </div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Upload Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
