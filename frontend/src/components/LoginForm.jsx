import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPic, setSignupPic] = useState(null);
  const navigate = useNavigate();

  const isTutor = userType === "tutor";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: isTutor ? "tutor" : "student",
      });

      if (isTutor) {
        Cookies.set("tutorId", res.data.user.tutorId, { expires: 1 });
        navigate("/tutor-home");
      } else {
        Cookies.set("studentId", res.data.user.studentId, { expires: 1 }); // Store student ID in cookies
        navigate("/student-home");

      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", signupName);
      formData.append("email", signupEmail);
      formData.append("password", signupPassword);
      formData.append("profilePic", signupPic);

      const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      setShowSignup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return showSignup ? (
    <form className="login-form" onSubmit={handleSignup}>
      <h2>Student Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={signupName}
        onChange={(e) => setSignupName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSignupPic(e.target.files[0])}
        required
      />
      <button type="submit">Sign Up</button>
      <p>
        Already a user?{" "}
        <span
          onClick={() => setShowSignup(false)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </form>
  ) : (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{isTutor ? "Tutor Login" : "Student Login"}</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p className="new-user">
        New {isTutor ? "Tutor" : "Student"}?{" "}
        {isTutor ? (
          <a href="/become-tutor">Apply as Tutor</a>
        ) : (
          <span
            onClick={() => setShowSignup(true)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        )}
      </p>
    </form>
  );
};

export default LoginForm;
