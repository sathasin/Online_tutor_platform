// src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Welcome to Tutoring Hub</h2>
        <p>Your destination for connecting students with tutors.</p>
      </div>
    </div>
  );
}

export default Home;
