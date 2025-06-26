import React, { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "../pages/StudentHome.css"; // Add CSS import if needed

const StudentProfile = ({ student }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [bio, setBio] = useState(student.bio || "");
  const [profilePic, setProfilePic] = useState(null);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      await axios.put(`http://localhost:5000/api/student/${student._id}`, formData);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  const renderProfileImage = () => {
    if (!student.profilePic) return null;
    const base64Img = `data:${student.profilePic.contentType};base64,${Buffer.from(
      student.profilePic.data.data
    ).toString("base64")}`;
    return <img src={base64Img} alt="Profile" className="student-profile-img" />;
  };

  return (
    <div className="student-profile">
      <h2>Student Profile</h2>

      {editing ? (
        <div className="student-profile-details">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label>Change Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />

          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className="student-profile-details">
          {renderProfileImage()}
          <h3>{name}</h3>
          <p>{bio || "No bio added"}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
