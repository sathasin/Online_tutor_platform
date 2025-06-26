import React, { useState, useEffect } from "react";
import axios from "axios";
import TutorProfile from "./TutorProfile"; // Import TutorProfile component

const TutorList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tutor/all");
        setTutors(res.data);
      } catch (err) {
        alert("Failed to fetch tutors.");
      }
    };

    fetchTutors();
  }, []);

  return (
    <div>
      <h2>Tutor List</h2>
      {tutors.length === 0 ? (
        <p>No tutors available.</p>
      ) : (
        <ul>
          {tutors.map((tutor) => (
            <li key={tutor._id}>
              <TutorProfile tutor={tutor} editable={false} /> {/* Disable editing */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorList;
