import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AllSubjects = ({ joinedSubjectIds = [], onJoinSuccess }) => {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const studentId = Cookies.get("studentId"); // Get student ID from cookies

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subject/all");
        setSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubjects();
  }, []);

  const handleJoinSubject = async (subjectId) => {
    try {
      await axios.put(`http://localhost:5000/api/student/${studentId}/subjects`, { subjectId });
      alert("Successfully joined the subject!");
      if (onJoinSuccess) onJoinSuccess(); // notify parent to refresh
    } catch (err) {
      alert("Failed to join subject");
    }
  };

  // Filter subjects: search + not already joined
  const filteredSubjects = subjects
    .filter((subject) => !joinedSubjectIds.includes(subject._id))
    .filter((subject) => subject.subjectName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <h3 className="section-title">All Subjects</h3>
      <input
        type="text"
        placeholder="Search subjects"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredSubjects.map((subject) => (
          <li key={subject._id} className="subject-card">
            {subject.subjectName} - {subject.tutorId?.name || "Tutor Info Not Available"}
            <button onClick={() => handleJoinSubject(subject._id)}>Join</button>
          </li>
        ))}
        {filteredSubjects.length === 0 && <li>No subjects available</li>}
      </ul>
    </div>
  );
};

export default AllSubjects;
