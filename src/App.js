import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./HomePage";
import About from "./components/About";
import HospitalLocator from "./components/HospitalLocator";
import Appointment from "./components/Appointment";
import Login from "./components/Login";
import DLogin from "./components/DLogin";
import SignUp from "./components/SignUp";
import HospitalRegistration from "./HospitalRegistration";
import Doctor from "./components/Doctor";
import KnowYourHealthPage from "./KnowYourHealthPage"; // Import the new component

import "./App.css";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(false);

  // Load login states from localStorage when the app mounts
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const doctorToken = localStorage.getItem("doctorToken");

    setIsUserLoggedIn(Boolean(userToken));
    setIsDoctorLoggedIn(Boolean(doctorToken));
  }, []);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsUserLoggedIn} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/hospital-locator" element={<HospitalLocator />} />
          <Route path="/hospital-registration" element={<HospitalRegistration />} />
          <Route path="/know-your-health" element={<KnowYourHealthPage />} /> {/* New Route */}

          {/* Protected Routes */}
          <Route
            path="/appointment"
            element={
              isUserLoggedIn ? (
                <Appointment isLoggedIn={isUserLoggedIn} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/doctor"
            element={
              isDoctorLoggedIn ? (
                <Doctor />
              ) : (
                <Navigate to="/DLogin" replace />
              )
            }
          />
          <Route
            path="/DLogin"
            element={<DLogin setIsDoctorLoggedIn={setIsDoctorLoggedIn} />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
