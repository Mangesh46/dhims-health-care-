// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const patientRoutes = require('./routes/patientRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');
// const geocodeRoutes = require('./routes/geocodeRoutes');
// const hospitalRoutes = require('./routes/hospitalRoutes');
// const doctorRoutes = require('./routes/doctor');
// const hospital = require('./routes/hospital');
// const Prescriptionroutes = require('./routes/Prescriptionroutes');
// const doctorLoginRoute = require('./routes/doctorLoginRoute');


// // Initialize the Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Replacing body-parser with Express's built-in middleware

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Logging middleware
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
//   next();
// });

// // Use routes in your app
// app.use('/api/auth', authRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/geocode', geocodeRoutes);
// app.use('/api/hospitals', hospitalRoutes); // Keeping this route
// app.use('/api/doctor', doctorRoutes); // Renamed for consistency
// app.use('/api/hospital', hospital); // If this route is necessary
// app.use('/api/prescriptions', Prescriptionroutes);
// app.use('/api/doctor/login', doctorLoginRoute);

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Healthcare Backend API');
// });

// // Error handling middleware for route not found
// app.use((req, res, next) => {
//   res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
// });

// // Error handling middleware for server errors
// app.use((err, req, res, next) => {
//   console.error('Server error:', err);
//   res.status(500).json({ error: 'Internal server error' });
// });

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const geocodeRoutes = require('./routes/geocodeRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctor');
const Prescriptionroutes = require('./routes/Prescriptionroutes');
const doctorLoginRoute = require('./routes/doctorLoginRoute');
const hospital = require('./routes/hospital');
// Initialize the Express app
const app = express();

// Middleware
app.use(cors());  // You can configure CORS more specifically
app.use(helmet()); // Adds HTTP headers for better security
app.use(express.json()); // Replacing body-parser with Express's built-in middleware

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Use routes in your app
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/geocode', geocodeRoutes);
app.use('/api/hospitals', hospitalRoutes); // Assuming this route handles hospital-related functionalities
app.use('/api/doctor', doctorRoutes);  // Renamed for consistency
app.use('/api/prescriptions', Prescriptionroutes);
app.use('/api/doctor/login', doctorLoginRoute);
app.use('/api/hospital', hospital); // If this route is necessary

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Healthcare Backend API');
});

// Error handling middleware for route not found
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
