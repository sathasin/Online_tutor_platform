// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BecomeTutor from "./pages/BecomeTutor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminPanel from "./pages/AdminPanel";
import TutorHome from "./pages/TutorHome";
import StudentHome from "./pages/StudentHome";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-tutor" element={<BecomeTutor/>} />
        <Route path="/Turtors" element={<div>Turtors</div>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin-login" element={<Admin />} />
        <Route path="/admin-panel" element={<AdminPanel />}/>
        <Route path="/tutor-home" element={<TutorHome/>} />
        <Route path="/student-home" element={<StudentHome/>} />
      </Routes>
    </Router>
  );
}

export default App;
