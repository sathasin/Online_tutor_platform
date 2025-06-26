// src/pages/AdminPanel.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ApplicationList from "../components/ApplicationList";
import SubjectList from "../components/SubjectList";
import StudentList from "../components/StudentList";
import TutorList from "../components/TutorList";
import "./AdminPanel.css";
import Cookies from "js-cookie";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [isAdmin, setIsAdmin] = useState(null); // null until check completes

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const userId = Cookies.get("adminId");
        const res = await axios.post("http://localhost:5000/api/auth/check-admin", { withCredentials: true ,userId});
        if (res.data.isAdmin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  if (isAdmin === null) {
    return <p>Loading...</p>; // while checking
  }

  if (!isAdmin) {
    return <h1 style={{ color: "red" }}>Illegal Access</h1>;
  }

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="tabs">
        <button onClick={() => handleTabChange("applications")}>Applications</button>
        <button onClick={() => handleTabChange("subjects")}>Subjects</button>
        <button onClick={() => handleTabChange("students")}>Students</button>
        <button onClick={() => handleTabChange("tutors")}>Tutors</button>
      </div>

      <div className="tab-content">
        {activeTab === "applications" && <ApplicationList />}
        {activeTab === "subjects" && <SubjectList />}
        {activeTab === "students" && <StudentList />}
        {activeTab === "tutors" && <TutorList />}
      </div>
    </div>
  );
};

export default AdminPanel;
