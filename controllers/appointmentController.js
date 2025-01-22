const Appointment = require('../models/Appointment');

// Create Appointment
exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, date } = req.body;

  try {
    const appointment = await Appointment.create({ patient: patientId, doctor: doctorId, date });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patient doctor');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving appointments' });
  }
};
