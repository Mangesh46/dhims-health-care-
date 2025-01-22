// controllers/hospitalController.js

const Hospital = require('../models/Hospital');

exports.getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate('doctors'); // Populate doctors to show doctor details
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving hospitals', error: err.message });
  }
};

exports.getHospitalDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const hospital = await Hospital.findById(id).populate('doctors');
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving hospital details', error: err.message });
  }
};
