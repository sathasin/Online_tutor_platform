// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Tutoring Hub</h1>
      <ul className="nav-links">
        <li><Link to="/become-tutor">Become a Tutor</Link></li>
        <li><Link to="/login">Login / Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
