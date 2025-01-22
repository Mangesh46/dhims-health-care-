import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointment.css";

const Appointment = ({ isLoggedIn }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visitType, setVisitType] = useState("first");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [slotsAvailable, setSlotsAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingHospitals, setLoadingHospitals] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hospitals");
        const data = await response.json();
        setHospitals(data.hospitals || []);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setErrorMessage("Failed to load hospitals.");
      } finally {
        setLoadingHospitals(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedHospital) {
        setLoadingDoctors(true);
        try {
          const response = await fetch(`http://localhost:5000/api/hospitals/doctors/${selectedHospital._id}`);
          const data = await response.json();
          setDoctors(data.doctors || []);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setErrorMessage("Failed to load doctors.");
        } finally {
          setLoadingDoctors(false);
        }
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedHospital]);

  const handleHospitalChange = (e) => {
    const hospital = hospitals.find((h) => h._id === e.target.value);
    setSelectedHospital(hospital);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    checkSlotAvailability(e.target.value);
  };

  const checkSlotAvailability = (doctorId) => {
    setSlotsAvailable(true); // Assuming slots are available for simplicity
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    if (selectedDoctor) {
      checkSlotAvailability(selectedDoctor);
    }
  };

  const validateForm = () => {
    if (!name || !phoneNumber || !selectedHospital || !selectedDoctor || !selectedDate) {
      setErrorMessage("Please fill in all fields before booking.");
      return false;
    }
    if (!slotsAvailable) {
      setErrorMessage("No slots available for the selected doctor and date.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleBooking = async () => {
    if (validateForm()) {
      setBooking(true);
      const patientData = {
        name,
        phoneNumber,
        visitType,
        hospitalId: selectedHospital._id,
        doctorId: selectedDoctor,
        appointmentDate: selectedDate.toISOString(),
      };

      try {
        const response = await fetch("http://localhost:5000/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        });

        if (response.ok) {
          alert("Appointment booked successfully!");
          setName("");
          setPhoneNumber("");
          setSelectedHospital(null);
          setSelectedDoctor(null);
          setSelectedDate(null);
        } else {
          const result = await response.json();
          setErrorMessage(result.message || "Failed to book appointment.");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        setErrorMessage("Failed to book appointment.");
      } finally {
        setBooking(false);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="appointment-container">
        <h2>Please log in to book an appointment.</h2>
      </div>
    );
  }

  return (
    <div className="appointment-container">
      <h2>Book Your Appointment</h2>
      <form>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <select value={visitType} onChange={(e) => setVisitType(e.target.value)}>
          <option value="first">First-time visit</option>
          <option value="returning">Returning patient</option>
        </select>
        <select
          value={selectedHospital?._id || ""}
          onChange={handleHospitalChange}
          disabled={loadingHospitals}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital._id} value={hospital._id}>
              {hospital.hospital_name}
            </option>
          ))}
        </select>
        <select
          value={selectedDoctor || ""}
          onChange={handleDoctorChange}
          disabled={loadingDoctors || !doctors.length}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <Calendar
          onChange={handleDateSelection}
          value={selectedDate}
          tileDisabled={({ date }) => date < new Date()}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="button" onClick={handleBooking} disabled={booking}>
          {booking ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default Appointment;
