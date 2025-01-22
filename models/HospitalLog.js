const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  hospital_name: { type: String, required: true },
  hospital_address: { type: String, required: true },
  contact_number: { type: String, required: true },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', // Reference to the Doctor model
    },
  ],
}, {
  timestamps: true,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
