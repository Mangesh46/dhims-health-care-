import React from "react";
import "./Input.css"; // You can style this file as needed or remove it if not used

const Input = ({ type, placeholder, value, onChange, error }) => (
  <div className="input-container">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error ? "input-error" : ""}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export default Input;
