// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
// import './StudentList.css';
import { Buffer } from "buffer";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  
 
    
   
  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student/all");
        setStudents(res.data);
      } catch (err) {
        alert("Failed to fetch students.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id} className="student-item">
              <div className="student-image">
                {
                student.profilePic ? (
                  <>
                 <img
  src={`data:${student.profilePic.contentType};base64,${Buffer.from(student.profilePic.data.data).toString('base64')}`}
  alt="Profile"
/>
                  </>
                  
                ) : (
                  <div className="no-image">No image</div>
                )}
              </div>
              <div className="student-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
