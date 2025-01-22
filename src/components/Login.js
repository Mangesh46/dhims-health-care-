import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock login logic
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("userToken", "mockToken");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="abc">
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
          
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="links">
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
         
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
