// src/components/SubjectList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './SubjectList.css';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subject/all");
        setSubjects(res.data);
      } catch (err) {
        alert("Failed to fetch subjects.");
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="subject-list-container">
      <h2>Subject List</h2>
      {subjects.length === 0 ? (
        <p>No subjects available.</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id} className="subject-item">
              <p><strong>Subject Name:</strong> {subject.name}</p>
              <p><strong>Tutor Name:</strong> {subject.tutorId ? subject.tutorId.name : "No tutor assigned"}</p>
              <p><strong>Tutor Email:</strong> {subject.tutorId ? subject.tutorId.email : "No tutor assigned"}</p>
              <p><strong>Students:</strong> {subject.studentIds.length} enrolled</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectList;
