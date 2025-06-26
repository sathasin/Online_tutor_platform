import React, { useEffect, useState } from "react";
import axios from "axios";

const MySubjects = ({ subjectIds }) => {
  const [subjectDetails, setSubjectDetails] = useState([]);

  useEffect(() => {
    const fetchSubjectsAndTutors = async () => {
      
      const subjectsWithDetails = await Promise.all(
       
        subjectIds.map(async (subjectId) => {
          try {
            // 👉 fetch subject details
            const subjectRes = await axios.get(`http://localhost:5000/api/subject/${subjectId._id}`);
            const subjectData = subjectRes.data;
           
            let tutorData = null;
            if (subjectData.tutorId) {
              // 👉 fetch tutor details
              const tutorRes = await axios.get(`http://localhost:5000/api/tutor/${subjectId.tutorId}`);
              tutorData = tutorRes.data;
            }

            return { ...subjectData, tutor: tutorData };
          } catch (err) {
            console.error("Failed to fetch subject or tutor for subjectId:", subjectId, err);
            return null; // skip failed subject
          }
        })
      );

      // filter out nulls
      setSubjectDetails(subjectsWithDetails.filter(s => s !== null));
    };

    if (subjectIds.length > 0) {
      fetchSubjectsAndTutors();
    }
  }, [subjectIds]);

  return (
    <div>
      <h3 className="section-title">My Subjects</h3>
      <ul>
        {subjectDetails.map((subject) => (
          <li key={subject._id} className="subject-card">
            <div>
              <strong>{subject.subjectName}</strong> <br />
              Tutor: {subject.tutor ? subject.tutor.tutor.name : "Tutor Info Not Available"}
            </div>
            {
            subject.call ? (
               <a
               href={`https://meet.jit.si/${subject.meetingId}`}
               target="_blank"
               rel="noopener noreferrer"
             >
               <button>Join Meet</button>
             </a>
            ) : (
              <span>No active call</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MySubjects;
