import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }
    setError("");

    try {
      const [firstName, lastName] = fullName.split(" ");  // Assuming full name contains both first and last name
      const role = "user"; // Set the default role, you can modify this as needed

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-Up Successful");
        navigate("/login"); // Redirect to login after successful sign-up
      } else {
        setError(data.error || "Sign-Up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("Sign-Up failed. Please try again.");
    }
  };

  return (
    
    <div className="signup-container">
      <div className="signup-header">
        <div className="logo" onClick={() => (window.location.href = "/")}>
          <h1>DHIMS</h1>
        </div>
        <h2>Join Us Today</h2>
        <p>Start managing your health effectively with DHIMS.</p>
      </div>
      <div className="signup-form">
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp} className="signup-button">
          Sign Up
        </button>
        <p className="redirect-text">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
    
  );
};

export default SignUp;
