const mongoose = require('mongoose');
const AppointmentID = require('./AppointmentID'); // Ensure this path is correct

const AppointmentIDSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true
  },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('AppointmentID', AppointmentIDSchema);
