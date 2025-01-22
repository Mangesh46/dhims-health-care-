const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');  

// POST route to create an appointment
router.post('/', async (req, res) => {
  const { name, phoneNumber, visitType, hospitalId, doctorId, appointmentDate } = req.body;

  if (!name || !phoneNumber || !visitType || !hospitalId || !doctorId || !appointmentDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Fetch the doctor's name using doctorId
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({ message: 'Doctor not found.' });
    }

    const newAppointment = new Appointment({
      name,
      phoneNumber,
      visitType,
      hospitalId,
      doctorName: doctor.name, // Set the doctorName based on the doctor's data
      appointmentDate,
    });

    await newAppointment.save();
    res.status(200).json({ message: 'Appointment booked successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to book appointment.' });
  }
});

module.exports = router;
