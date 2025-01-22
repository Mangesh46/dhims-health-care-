const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');
const AppointmentID = require('../models/AppointmentID');
const Doctor = require('../models/Doctor');
const authenticate = require('../middleware/authentication');

// Create a new prescription
router.post('/prescriptions', authenticate, async (req, res) => {
  const { doctorId, appointmentId, medication, dosage } = req.body;
  const userId = req.user._id;

  if (!doctorId || !appointmentId || !medication || !dosage) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const appointment = await AppointmentID.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const newPrescription = new Prescription({
      userId,
      doctorId,
      appointmentId,
      medication,
      dosage,
      issuedDate: new Date(),
    });

    const savedPrescription = await newPrescription.save();
    res.status(201).json({
      message: 'Prescription created successfully',
      prescription: savedPrescription,
    });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({
      message: 'Failed to create prescription',
      error: error.message,
    });
  }
});

module.exports = router;
