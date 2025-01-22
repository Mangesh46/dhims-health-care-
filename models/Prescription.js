const Appointment = require('./AppointmentID');
const Doctor = require('./Doctor');


// Example of creating a new prescription
const createPrescription = async (userId, doctorId, appointmentId, medication, dosage) => {
  try {
    // Check if the appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }


    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Create a new prescription
    const newPrescription = new Prescription({
      userId,
      doctorId,
      appointmentId, // Consistent field name
      medication,
      dosage,
      issuedDate: new Date(),
    });

    // Save the prescription
    await newPrescription.save();
    console.log('Prescription created successfully!');
  } catch (error) {
    console.error('Error creating prescription:', error.message);
  }
};
