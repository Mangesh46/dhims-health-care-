const express = require('express');
const Joi = require('joi'); // Import Joi for validation
const Hospital = require('../models/Hospital'); // Import Hospital model
const Doctor = require('../models/Doctor');     // Import Doctor model
const router = express.Router();


// Save doctor helper function
async function saveDoctor(doctorData, hospitalId) {
  const doctor = new Doctor({
    ...doctorData,
    hospital: hospitalId,
  });
  return doctor.save();
}

router.post('/', async (req, res) => {
  const { hospital_name, hospital_address, contact_number, doctors } = req.body;

  try {
    // Validate input (optional validation logic can be added here)
    if (!hospital_name || !hospital_address || !contact_number || !doctors || !Array.isArray(doctors) || doctors.length === 0) {
      return res.status(400).json({ message: 'Invalid input. Please provide all required fields.' });
    }

    // Save all doctors to the Doctor model
    const savedDoctors = await Promise.all(
      doctors.map(async (doctorData) => {
        const doctor = new Doctor(doctorData); // Assuming Doctor is your Mongoose model
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
