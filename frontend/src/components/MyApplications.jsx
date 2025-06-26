import React, { useEffect, useState } from "react";
import axios from "axios";

import "./MyApplications.css";

const MyApplications = ({ tutorId, onClose }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/application/tutor/${tutorId}`);
        setApplications(res.data.applications);
      } catch (err) {
        alert("Error fetching applications");
      }
    };

    fetchApplications();
  }, [tutorId]);

  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h3>My Applications</h3>
        <button onClick={onClose}>X</button>
      </div>
      <div className="application-list">
        {applications.map((app) => (
          <div key={app._id} className="application-item">
            <p><strong>Subject:</strong> {app.subject}</p>
            <p><strong>Status:</strong> {app.status}</p>
            {app.resume ? (
                <a
                  href={`http://localhost:5000/api/application/resume/${app._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
              ) : (
                <p>No resume uploaded</p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
