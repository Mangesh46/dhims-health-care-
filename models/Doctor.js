const mongoose = require('mongoose');

// Define the doctor schema
const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Doctor name is required.'] // Custom error message
  },
  specialty: { 
    type: String, 
    required: [true, 'Specialty is required.'] // Custom error message
  },
  contact_number: { 
    type: String, 
    required: [true, 'Contact number is required.'] // Custom error message
  },
  email: { 
    type: String, 
    required: [true, 'Email is required.'],
    unique: true // Ensure emails are unique
  },
  password: { 
    type: String, 
    required: [true, 'Password is required.'] // Custom error message
  },
  hospital_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hospital' 
  },
  department: { 
    type: String, 
    // required: [true, 'Department is required.'] // Custom error message
  },
  appointment_timing: { 
    type: String, 
    // required: [true, 'Appointment timing is required.'] // Custom error message
  },
}, { timestamps: true }); // Added timestamps to track creation and update times

// Export the Doctor model
module.exports = mongoose.model('Doctor', doctorSchema);
