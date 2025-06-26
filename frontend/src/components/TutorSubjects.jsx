import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TutorSubjects.css"; // Assuming you have some CSS for styling

const TutorSubjects = ({ subjectIds }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const detailedSubjects = await Promise.all(
        subjectIds.map(async (subjectId) => {
          try {
        
            const res = await axios.get(`http://localhost:5000/api/subject/${subjectId}`);
            return res.data;
          } catch (err) {
            console.error(`Failed to fetch subject ${subjectId}`, err);
            return null;
          }
        })
      );

      setSubjects(detailedSubjects.filter(s => s !== null));
    };

    if (subjectIds.length > 0) fetchSubjects();
  }, [subjectIds]);

  const handleCreateCall = async (subjectId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/subject/${subjectId}/start-call`);
      alert("Meeting started! Meet ID: " + res.data.meetingId);
      // optionally refresh subjects list
      // setSubjects((prev) =>
      //   prev.map((s) => (s._id === subjectId ? res.data.subject : s))
      // );

      // Redirect to Jitsi meeting URL
      // const meetUrl = `https://meet.jit.si/${res.data.meetingId}`;
      // window.location.assign(meetUrl); // Direct external redirect to the meeting URL
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert("Failed to start call");
    }
  };

  const handleEndCall = async (subjectId) => {
    try {
      await axios.put(`http://localhost:5000/api/subject/${subjectId}/end-call`);
      alert("Meeting ended.");
      // optionally refresh subjects list
      window.location.reload(); 

    } catch (err) {
      console.error(err);
      alert("Failed to end call");
    }
  };

  return (
    <div className="tutor-subjects">
      <h3>My Subjects</h3>
      <ul>
        {subjects.map(subject => (
          <li key={subject._id} className="subject-card">
            {subject.subjectName}
            {subject.call ? (
              <>
                <span style={{ marginLeft: "10px", color: "green" }}> (Call Active)</span>
                <button onClick={() => handleEndCall(subject._id)}>End Call</button>
                <button onClick={() => window.location.assign(`https://meet.jit.si/${subject.meetingId}`)}>
                  Open Meet
                </button>
              </>
            ) : (
              <button onClick={() => handleCreateCall(subject._id)}>Create Call</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorSubjects;
