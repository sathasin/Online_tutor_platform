import React, { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "./TutorProfile.css";

const TutorProfile = ({ tutor, editable = true }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTutor, setUpdatedTutor] = useState({
    name: tutor.name,
    bio: tutor.bio,
    languages: tutor.languages,
  });

  const handleEditToggle = () => setEditing((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split string into array if it's languages
    if (name === "languages") {
      setUpdatedTutor((prev) => ({ ...prev, [name]: value.split(",").map((s) => s.trim()) }));
    } else {
      setUpdatedTutor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setUpdatedTutor((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updatedTutor.name);
    formData.append("bio", updatedTutor.bio);
    formData.append("languages", JSON.stringify(updatedTutor.languages));
    if (updatedTutor.profilePic) {
      formData.append("profilePic", updatedTutor.profilePic);
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/tutor/update/${tutor._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          {tutor.profilePic ? (
            <img
              src={`data:${tutor.profilePic.contentType};base64,${Buffer.from(
                tutor.profilePic.data
              ).toString("base64")}`}
              alt="Profile"
            />
          ) : (
            <div className="no-image">No image</div>
          )}
        </div>
        <div>
          <h2>{tutor.name}</h2>
          <p><strong>Email:</strong> {tutor.email}</p>
        </div>
      </div>

      {editing && editable ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Bio:
            <textarea name="bio" value={updatedTutor.bio} onChange={handleChange} required />
          </label>

          <label>
            Languages (comma-separated):
            <input type="text" name="languages" value={updatedTutor.languages.join(", ")} onChange={handleChange} required />
          </label>

          <label>
            Profile Picture:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleEditToggle}>Cancel</button>
        </form>
      ) : (
        <>
          <p><strong>Bio:</strong> {tutor.bio}</p>
          <p><strong>Languages:</strong> {tutor.languages.join(", ")}</p>
          {editable && <button onClick={handleEditToggle}>Edit Profile</button>}
        </>
      )}
    </div>
  );
};

export default TutorProfile;
