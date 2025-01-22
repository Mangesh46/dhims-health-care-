const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Doctor = require('../models/Doctor');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login attempts
  message: 'Too many login attempts, please try again later.',
});

// doctorLoginRoute Login Endpoint
router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const doctor = await Doctor.findOne({ email }).select('-password');
      if (!doctor) {
        return res.status(400).json({ message: 'Doctor not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, doctor.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ doctorId: doctor._id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token, doctor });
    } catch (error) {
      console.error('Error during doctor login:', error.message);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
);

module.exports = router;
