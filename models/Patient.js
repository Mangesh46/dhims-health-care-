const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Ensure 'User' model exists
  },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  emergency_contact_name: { type: String, required: true },
  emergency_contact_number: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Patient', patientSchema);
