import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

<img src="/d_login"  alt="DHIMS Logo" />
const DLogin = ({ setIsDoctorLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    if (token) {
      setIsDoctorLoggedIn(true);
      navigate("/doctor/dashboard");
    }
  }, [setIsDoctorLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/doctor/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("doctorToken", token);
      setIsDoctorLoggedIn(true);
      navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="abc">
      <div className="login-container">
      <div className="login-box">
      <h2 className="login-title">Sign In</h2>
    <div>
      <h2>Doctor Login</h2>
      {error && <p>{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default DLogin;
