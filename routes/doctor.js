const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// POST route to create a new doctor
router.post('/create', async (req, res) => {
  try {
    const { name, specialty, contact_number, email, password, hospital_id, department, appointment_timing } = req.body;

    if (!name || !specialty || !contact_number || !email || !password || !hospital_id || !department || !appointment_timing) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const doctor = new Doctor({
      name,
      specialty,
      contact_number,
      email,
      password,
      hospital_id,
      department,
      appointment_timing
    });

    await doctor.save();
    res.status(201).json(doctor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
