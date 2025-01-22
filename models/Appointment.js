const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  visitType: { type: String, required: true },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital', // Reference to the Hospital model
    required: true,
  },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
}, {
  timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
