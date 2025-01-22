const Patient = require('../models/Patient');

// Create Patient Record
exports.createPatient = async (req, res) => {
  const { age, gender, medicalHistory } = req.body;
  try {
    const patient = new Patient({
      user: req.user.id,
      age,
      gender,
      medicalHistory,
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error creating patient record' });
  }
};

// Get Patient Records
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('user');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patients' });
  }
};
