import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import StudentProfile from "../components/StudentProfile";
import MySubjects from "../components/MySubjects";
import AllSubjects from "../components/AllSubjects";
import "./StudentHome.css";

const StudentHome = () => {
  const studentId = Cookies.get("studentId");
  const [student, setStudent] = useState(null);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState("mySubjects");

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/student/${studentId}`);
        setStudent(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAllSubjects = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/subject/all`);
        setAllSubjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudentProfile();
    fetchAllSubjects();
  }, [studentId]);

  const handleJoin = async (subjectId) => {
    try {
      await axios.put(`http://localhost:5000/api/subject/${subjectId}/join`, { studentId });
      // refresh student data
      const res = await axios.get(`http://localhost:5000/api/student/${studentId}`);
      setStudent(res.data);
      alert("Joined subject successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="student-home">
      {student && (
        <>
          <StudentProfile student={student} />

          <div className="tabs">
            <button onClick={() => setSelectedTab("mySubjects")} className={selectedTab === "mySubjects" ? "active" : ""}>My Subjects</button>
            <button onClick={() => setSelectedTab("allSubjects")} className={selectedTab === "allSubjects" ? "active" : ""}>All Subjects</button>
          </div>

          {selectedTab === "mySubjects" ? (
            <MySubjects subjectIds={student.subjects} />
          ) : (
            <AllSubjects
              subjects={allSubjects}
              joinedSubjectIds={student.subjects.map((s) => s._id)}
              onJoin={handleJoin}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StudentHome;
