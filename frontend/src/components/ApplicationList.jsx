import React, { useEffect, useState } from "react";
import axios from "axios";

import "./ApplicationList.css";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/application/all");
        setApplications(res.data);
        setLoading(false);
      } catch (err) {
        alert("Failed to fetch applications.");
        setLoading(false);
      }
    };
    fetchApps();
  }, []);
  const handleApprove = async (app) => {
    try {
      await axios.put(`http://localhost:5000/api/application/${app._id}/approve`);
      alert("Approved successfully!");
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: "approved" } : a))
      );
    } catch (err) {
      alert("Failed to approve");
    }
  };
  
  const handleReject = async (app) => {
    try {
      await axios.put(`http://localhost:5000/api/application/${app._id}/reject`);
      alert("Rejected successfully!");
      setApplications((prev) =>
        prev.map((a) => (a._id === app._id ? { ...a, status: "rejected" } : a))
      );
    } catch (err) {
      alert("Failed to reject");
    }
  };
  

  if (loading) {
    return <p>Loading applications...</p>;
  }
  const sortedApps = [...applications].sort((a, b) => 
    a.status === "pending" ? -1 : 1
  );

  return (
    <div className="application-list">
      <h2>Submitted Applications</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul>
          {sortedApps.map((app) => (
            <li key={app._id}>
            <p><strong>Name:</strong> {app.tutorId?.name}</p><br />
            <p><strong>Email:</strong> {app.tutorId?.email}</p><br />
            <p><strong>Subject:</strong> {app.subject}</p><br />
            <p><strong>Status:</strong> {app.status}</p><br />
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
            {app.status === "pending" && (
              <>
                <button onClick={() => handleApprove(app)}>Approve</button>
                <button onClick={() => handleReject(app)}>Reject</button>
              </>
            )}
          </li>
          
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationList;
