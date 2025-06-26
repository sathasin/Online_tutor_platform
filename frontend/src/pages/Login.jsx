import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import studentImg from "../assets/student.png";
import tutorImg from "../assets/tutor.png";
import "./Login.css";

const Login = () => {
  const [isTutor, setIsTutor] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Button-like Toggles for Student and Tutor */}
        <div className="login-toggle">
          <button
            className={`toggle-button ${!isTutor ? "active" : ""}`}
            onClick={() => setIsTutor(false)}
          >
            Student
          </button>
          <button
            className={`toggle-button ${isTutor ? "active" : ""}`}
            onClick={() => setIsTutor(true)}
          >
            Tutor
          </button>
        </div>

        {/* Dynamic Content */}
        
        <div className="login-section">
        <img className="logimg" src={isTutor ? tutorImg : studentImg} alt="role" />
          
          <div className="login-box">
            <LoginForm userType={isTutor ? "tutor" : "student"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
