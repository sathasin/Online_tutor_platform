import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import TutorProfile from "../components/TutorProfile";
import NewApplication from "../components/NewApplication";
import MyApplications from "../components/MyApplications";
import { useNavigate } from "react-router-dom";
import TutorSubjects from "../components/TutorSubjects";
import "./TutorHome.css";

const TutorHome = () => {
  const [tutor, setTutor] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [showMyApplications, setShowMyApplications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      const tutorId = Cookies.get("tutorId");
      if (!tutorId) return navigate("/login");

      try {
        
        const res = await axios.get('http://localhost:5000/api/tutor/' + tutorId );
        setTutor(res.data.tutor);
      } catch (err) {
        console.error("Error fetching tutor details:", err);
        alert("Failed to fetch tutor data.");
      }
    };

    fetchTutorDetails();
  }, [navigate]);
  const handleMyApplications = () => {
    setShowMyApplications(true);
  };
  if (!tutor) return <p>Loading...</p>;

  return (
    <div className="tutor-home">
      <div className="profile-section">
        <TutorProfile tutor={tutor} />
        <div className="profile-buttons">
          <button onClick={() => setShowApplication(true)}>New Application</button>
          <button onClick={handleMyApplications}>My Applications</button>
        </div>
      </div>

      <div className="my-subjects">
        <p>My Subjects:</p>
        
      
        <TutorSubjects subjectIds={tutor.classes} /> 
        
      </div>

      {showApplication && <NewApplication onClose={() => setShowApplication(false)} />}
      {showMyApplications && (
  <MyApplications
    tutorId={tutor._id}
    onClose={() => setShowMyApplications(false)}
  />
)}
    </div>
  );
};

export default TutorHome;
