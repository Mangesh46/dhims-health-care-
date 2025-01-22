const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Route to handle geocoding with OpenCage API
router.get('/', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,  // Address to geocode
        key: process.env.OPENCAGE_API_KEY,  // OpenCage API Key from .env
      },
    });

    if (response.data.status.code !== 200) {
      return res.status(400).json({
        error: 'Invalid response from OpenCage API',
        details: response.data,
      });
    }

    // Check if there are results
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ error: 'No results found for the given address' });
    }

    const location = response.data.results[0].geometry;
    res.json({
      address: response.data.results[0].formatted,
      latitude: location.lat,
      longitude: location.lng,
    });
  } catch (error) {
    console.error('Error fetching geocode:', error);
    res.status(500).json({ error: 'Failed to fetch geocode' });
  }
});

module.exports = router;
