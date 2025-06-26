import React, { useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import "./BecomeTutor.css";

const BecomeTutor = () => {
  const [showForm, setShowForm] = useState(true);  // Only show the form now

  return (
    <div className="become-tutor-page">
      <div className="top-buttons">
        <button
          className={showForm ? "active" : ""}
          onClick={() => setShowForm(true)}
        >
          Apply as Tutor
        </button>
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>As a tutor, you will be responsible for teaching students online in various subjects.</li>
          <li>You can create and conduct live classes through our platform, providing students with valuable lessons.</li>
          <li>Upload a clear and updated resume in PDF format, showcasing your qualifications.</li>
          <li>Select all the subjects you are qualified to teach and share your expertise with students.</li>
          <li>Once you apply, the admin will review your application and approve it.</li>
          <li>After approval, you can start conducting online classes and interact with students.</li>
        </ul>
      </div>

      {showForm && <ApplicationForm />}
    </div>
  );
};

export default BecomeTutor;
