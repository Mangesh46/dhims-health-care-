import React, { useState } from 'react';
import './HospitalRegistration.css';

const HospitalRegistration = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [doctors, setDoctors] = useState([
    {
      name: '',
      specialty: '',
      contact_number: '',
      appointment_timing: '',
      email: '',
      password: '',
      department: '',
    },
  ]);
  const [error, setError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!hospitalName || !hospitalAddress || !contactNumber) {
      setError('Please fill in all hospital fields.');
      return;
    }

    if (
      doctors.some(
        (doctor) =>
          !doctor.name ||
          !doctor.specialty ||
          !doctor.contact_number ||
          !doctor.appointment_timing ||
          !doctor.email ||
          !doctor.password
      )
    ) {
      setError('Please fill in all doctor fields.');
      return;
    }

    setError('');

    const hospitalData = {
      hospital_name: hospitalName,
      hospital_address: hospitalAddress,
      contact_number: contactNumber,
      doctors: doctors.map((doctor) => ({
        name: doctor.name,
        specialty: doctor.specialty,
        contact_number: doctor.contact_number,
        appointment_timing: doctor.appointment_timing,
        email: doctor.email,
        password: doctor.password,
        department: doctor.department,
      })),
    };

    try {
      const response = await fetch('http://localhost:5000/api/hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hospitalData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Hospital and doctors registered successfully!');
        setHospitalName('');
        setHospitalAddress('');
        setContactNumber('');
        setDoctors([
          {
            name: '',
            specialty: '',
            contact_number: '',
            appointment_timing: '',
            email: '',
            password: '',
            department: '',
          },
        ]);
      } else {
        setError('Error registering: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      setError('Error registering: ' + error.message);
    }
  };

  const addDoctor = () => {
    setDoctors([
      ...doctors,
      {
        name: '',
        specialty: '',
        contact_number: '',
        appointment_timing: '',
        email: '',
        password: '',
        department: '',
      },
    ]);
  };

  const updateDoctorField = (index, field, value) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[index][field] = value;
    setDoctors(updatedDoctors);
  };

  return (
    <div className="hospital-registration">
      <h1>Register Hospital and Doctors</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Hospital Name:</label>
        <input
          type="text"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
          required
        />

        <label>Hospital Address:</label>
        <textarea
          value={hospitalAddress}
          onChange={(e) => setHospitalAddress(e.target.value)}
          required
        />

        <label>Contact Number:</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />

        <h3>Doctors</h3>
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-form">
            <h4>Doctor {index + 1}</h4>
            <label>Name:</label>
            <input
              type="text"
              value={doctor.name}
              onChange={(e) => updateDoctorField(index, 'name', e.target.value)}
              required
            />
            <label>Specialization:</label>
            <input
              type="text"
              value={doctor.specialty}
              onChange={(e) =>
                updateDoctorField(index, 'specialty', e.target.value)
              }
              required
            />
            <label>Contact Number:</label>
            <input
              type="text"
              value={doctor.contact_number}
              onChange={(e) =>
                updateDoctorField(index, 'contact_number', e.target.value)
              }
              required
            />
            <label>Department:</label>
            <input
              type="text"
              value={doctor.department}
              onChange={(e) =>
                updateDoctorField(index, 'department', e.target.value)
              }
              required
            />
            <label>Appointment Timing:</label>
            <input
              type="text"
              value={doctor.appointment_timing}
              onChange={(e) =>
                updateDoctorField(index, 'appointment_timing', e.target.value)
              }
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={doctor.email}
              onChange={(e) =>
                updateDoctorField(index, 'email', e.target.value)
              }
              required
            />
            <label>Password:</label>
            <input
              type={passwordVisibility ? 'text' : 'password'}
              value={doctor.password}
              onChange={(e) =>
                updateDoctorField(index, 'password', e.target.value)
              }
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {passwordVisibility ? 'Hide Password' : 'Show Password'}
            </button>
          </div>
        ))}
        <button type="button" onClick={addDoctor}>
          Add Another Doctor
        </button>
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default HospitalRegistration;
