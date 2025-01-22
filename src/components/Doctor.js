import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/doctor/login', { email, password });
      const { token, doctor } = response.data;

      localStorage.setItem('doctorToken', token);
      localStorage.setItem('doctorId', doctor._id);

      // Redirect to dashboard or appointments page
      window.location.href = '/doctor/dashboard';
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Login failed');
    }
  };

  return (
    <div>
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DoctorLogin;
