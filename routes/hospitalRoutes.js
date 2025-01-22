// routes/hospitals.js

const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

// Get all hospitals with their doctors
router.get('/', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ hospitals });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hospitals.' });
  }
});

router.get('/doctors/:id', async (req, res) => {
  try {
    const selectedHospital = req.params.id; // Fetch the parameter
    const hospital = await Hospital.findOne({ _id: selectedHospital });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found.' });
    }
    const doctorIds = hospital.doctors;
    if (!doctorIds || doctorIds.length === 0) {
      console.warn('No doctor IDs found in the hospital.');
      return res.status(404).json({ message: 'No doctors available for this hospital.' });
    }

    // Fetch all doctors whose IDs are in the array
    const doctors = await Doctor.find({ _id: { $in: doctorIds } });

    // Respond with the list of doctors
    res.status(200).json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch doctors.' });
  }
});

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

// POST route to create a new hospital with doctors
router.post('/', async (req, res) => {
  const { hospital_name, hospital_address, contact_number, doctors } = req.body;

  try {
    if (!hospital_name || !hospital_address || !contact_number || !doctors || !Array.isArray(doctors) || doctors.length === 0) {
      return res.status(400).json({ message: 'Invalid input. Please provide all required fields.' });
    }

    // Save all doctors to the Doctor model
    const savedDoctors = await Promise.all(
      doctors.map(async (doctorData) => {
        const doctor = new Doctor(doctorData); // Create new doctor from request data
        return await doctor.save();
      })
    );

    // Extract all doctor IDs
    const doctorIds = savedDoctors.map((doctor) => doctor._id);

    // Create hospital with doctor IDs
    const hospital = new Hospital({
      hospital_name,
      hospital_address,
      contact_number,
      doctors: doctorIds,
    });

    const savedHospital = await hospital.save();

    res.status(200).json({
      message: 'Hospital and doctors registered successfully',
      hospital: savedHospital,
      doctors: savedDoctors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering hospital and doctors', error: err.message });
  }
});

module.exports = router;
