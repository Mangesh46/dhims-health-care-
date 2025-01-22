const axios = require('axios');

// Sample data of hospitals, replace with database or external API
const hospitals = [
  { _id: 1, name: 'Hospital A', city: 'City1', state: 'State1', lat: 28.7041, lng: 77.1025 },
  { _id: 2, name: 'Hospital B', city: 'City1', state: 'State1', lat: 28.5355, lng: 77.3910 },
  { _id: 3, name: 'Hospital C', city: 'City2', state: 'State2', lat: 19.0760, lng: 72.8777 },
  // Add more hospitals as needed
];

// Function to fetch hospitals based on state and city
const getHospitals = (state, city) => {
  let filteredHospitals = hospitals;

  if (state) {
    filteredHospitals = filteredHospitals.filter(h => h.state === state);
  }

  if (city) {
    filteredHospitals = filteredHospitals.filter(h => h.city === city);
  }

  return filteredHospitals;
};

// Function to get directions using Google Maps API
const getDirections = async (origin, destination) => {
  const googleMapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination.lat},${destination.lng}&key=YOUR_GOOGLE_API_KEY`;

  try {
    const response = await axios.get(googleMapsUrl);
    const directions = response.data.routes[0].legs[0].steps;
    return directions.map(step => step.html_instructions).join(' ');
  } catch (error) {
    throw new Error('Error fetching directions from Google Maps');
  }
};

module.exports = { getHospitals, getDirections };
