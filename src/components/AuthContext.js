import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userToken") ? true : false);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(localStorage.getItem("doctorToken") ? true : false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isDoctorLoggedIn, setIsDoctorLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
