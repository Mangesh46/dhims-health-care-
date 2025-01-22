import React, { useState } from "react";
import "./KnowYourHealthPage.css";

const KnowYourHealthPage = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);

      // Set message based on BMI range
      if (calculatedBMI < 18.5)  {
        setMessage("Underweight");
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
        setMessage("Normal weight");
      } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
        setMessage("Overweight");
      } else {
        setMessage("Obesity");
      }
    } else {
      alert("Please enter valid weight and height!");
    }
  };

  const resetForm = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setMessage("");
  };

  return (
    <div className="bmi-container">
      <div className="form-container">
      <h1 className="form-container">Know Your Health</h1>
        <div className="input-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
          />
        </div>
        <div className="input-group">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
          />
        </div>
        <button className="calculate-button" onClick={calculateBMI}>
          Calculate BMI
        </button>
        <button className="reset-button" onClick={resetForm}>
          Reset
        </button>
      </div>
      {bmi && (
        <div className="result-container">
          <p>Your BMI: <span className="bmi-value">{bmi}</span></p>
          <p>Category: <span className="bmi-message">{message}</span></p>
        </div>
      )}
    </div>
  );
};

export default KnowYourHealthPage;
