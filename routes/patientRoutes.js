const express = require('express');
const Patient = require('../models/Patient');
const { protect } = require('../middleware/authMiddleware');  // Import the protect middleware
const router = express.Router();

// Get all patients (public route, no authentication required)
router.get('/patientretrive', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patients' });
  }
});

// Create a new patient (protected route, authentication required)
router.post('/patientcreate', protect, async (req, res) => {
  const { user_id, dob, gender, phone_number, address, emergency_contact_name, emergency_contact_number } = req.body;

  try {
    const newPatient = new Patient({
      user_id,
      dob,
      gender,
      phone_number,
      address,
      emergency_contact_name,
      emergency_contact_number,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({ message: 'Error creating patient' });
  }
});

module.exports = router;
