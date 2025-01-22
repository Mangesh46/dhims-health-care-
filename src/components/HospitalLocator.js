import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationSearchMap = () => {
  const [location, setLocation] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [routeInstructions, setRouteInstructions] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [searchedLocationMarker, setSearchedLocationMarker] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const mapRef = useRef(null);

  const statesWithCities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kakinada', 'Nellore'],
    'Arunachal Pradesh': ['Itanagar', 'Tawang', 'Ziro', 'Pasighat', 'Tezu', 'Bomdila'],
    'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Silchar', 'Nagaon'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Munger', 'Darbhanga'],
    'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon'],
    'Goa': ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Junagadh'],
    'Haryana': ['Chandigarh', 'Gurgaon', 'Faridabad', 'Ambala', 'Hisar', 'Karnal'],
    'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Solan', 'Mandi'],
    'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Hazaribagh', 'Deoghar', 'Giridih'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'Shimoga'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kottayam', 'Thrissur', 'Kollam'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Ujjain', 'Jabalpur', 'Sagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Kolhapur', 
    'Solapur', 'Satara', 'Jalgaon', 'Chandrapur', 'Sangli', 'Amravati', 'Akola', 
    'Ratnagiri', 'Beed', 'Nanded', 'Latur', 'Parbhani', 'Buldhana', 'Washim', 
    'Wardha', 'Gadchiroli', 'Hingoli', 'Sindhudurg', 'Palghar', 'Raigad', 
    'Yavatmal', 'Osmanabad', 'Chiplun', 'Dombivli', 'Ulhasnagar', 
    'Bhiwandi', 'Kalyan', 'Vasai', 'Virar', 'Panvel', 'Karjat', 'Dapoli', 
    'Radhanagari', 'Pimpri-Chinchwad', 'Khopoli', 'Chakan', 'Talegaon', 
    'Matheran', 'Alibaug', 'Mahad', 'Ranjangaon', 'Junnar', 'Navi Mumbai', 
    'Bhandara', 'Amgaon', 'Nandurbar', 'Tisgaon'],
    'Manipur': ['Imphal', 'Churachandpur', 'Thoubal', 'Bishnupur'],
    'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongstoin'],
    'Mizoram': ['Aizawl', 'Champhai', 'Lunglei', 'Kolasib'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
    'Punjab': ['Chandigarh', 'Amritsar', 'Jalandhar', 'Ludhiana', 'Patiala', 'Bathinda'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer', 'Bikaner'],
    'Sikkim': ['Gangtok', 'Namchi', 'Pakyong', 'Rangpo'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli'],
    'Telangana': ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad'],
    'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Ambassa'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Noida', 'Allahabad'],
    'Uttarakhand': ['Dehradun', 'Nainital', 'Haridwar', 'Rishikesh', 'Roorkee', 'Haldwani'],
    'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Durgapur', 'Asansol']
  };

  useEffect(() => {
    const map = L.map(mapRef.current).setView([20.5937, 78.9629], 6);

    // Add base layers
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });

    const satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps',
    });

    const baseLayers = {
      'Street View': streetLayer,
      'Satellite View': satelliteLayer,
    };

    streetLayer.addTo(map); // Add default layer
    L.control.layers(baseLayers).addTo(map); // Add layer control

    setMapInstance(map);

    return () => {
      map.remove();
    };
  }, []);

  const handleLocationSearch = () => {
    if (location && mapInstance) {
      const apiKey = 'd6f1e2f2d3b4495f856d221b0f72101f';
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}, ${selectedCity}, ${selectedState}, India&key=${apiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status.code !== 200) {
            alert(`Error: ${data.status.message}`);
            return;
          }

          const results = data.results;
          if (!results || results.length === 0) {
            alert(`No results found for "${location}" in ${selectedCity}, ${selectedState}`);
            return;
          }

          const { lat, lng } = results[0]?.geometry || {};
          if (lat && lng) {
            const newEntry = { location, state: selectedState, city: selectedCity, lat, lng };
            setSearchHistory((prevHistory) => [newEntry, ...prevHistory.slice(0, 4)]);

            if (searchedLocationMarker) {
              mapInstance.removeLayer(searchedLocationMarker);
            }

            const newMarker = L.marker([lat, lng])
              .addTo(mapInstance)
              .bindPopup(`<b>${location}</b>, ${selectedCity}, ${selectedState}`)
              .openPopup();

            setSearchedLocationMarker(newMarker);

            if (userLocationMarker) {
              calculateRoute(userLocationMarker.getLatLng(), newMarker.getLatLng());
            }
          } else {
            alert('Location not found!');
          }
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
          alert('Error fetching location data.');
        });
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (userLocationMarker) {
            mapInstance.removeLayer(userLocationMarker);
          }

          const newUserLocationMarker = L.marker([latitude, longitude])
            .addTo(mapInstance)
            .bindPopup('<b>Your Location</b>')
            .openPopup();

          setUserLocationMarker(newUserLocationMarker);

          if (searchedLocationMarker) {
            calculateRoute(newUserLocationMarker.getLatLng(), searchedLocationMarker.getLatLng());
          }
        },
        (error) => {
          alert('Error getting location: ' + error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const calculateRoute = (startLatLng, endLatLng) => {
    if (routeControl) {
      routeControl.remove();
    }

    const newRouteControl = L.Routing.control({
      waypoints: [startLatLng, endLatLng],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }],
      },
    }).addTo(mapInstance);

    newRouteControl.on('routesfound', (e) => {
      const routes = e.routes[0];
      const instructions = routes.instructions.map((instruction) => ({
        text: instruction.text,
        distance: instruction.distance,
      }));
      setRouteInstructions(instructions);
    });

    setRouteControl(newRouteControl);
  };

  const handleBestView = () => {
    if (mapInstance) {
      const bounds = L.latLngBounds([]);

      if (userLocationMarker) {
        bounds.extend(userLocationMarker.getLatLng());
      }
      if (searchedLocationMarker) {
        bounds.extend(searchedLocationMarker.getLatLng());
      }

      if (bounds.isValid()) {
        mapInstance.fitBounds(bounds, { padding: [50, 50] });
      } else {
        alert('No locations to fit. Please search or set your location.');
      }
    }
  };

  const handleHistoryClick = (entry) => {
    const { lat, lng, location, city, state } = entry;

    if (searchedLocationMarker) {
      mapInstance.removeLayer(searchedLocationMarker);
    }

    const newMarker = L.marker([lat, lng])
      .addTo(mapInstance)
      .bindPopup(`<b>${location}</b>, ${city}, ${state}`)
      .openPopup();

    setSearchedLocationMarker(newMarker);

    if (userLocationMarker) {
      calculateRoute(userLocationMarker.getLatLng(), newMarker.getLatLng());
    }
  };

  return (
    <div style={{ color: 'white' }}>
      <h2><b>Location Search Map</b>
      </h2>

      <div>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity('');
          }}
          style={{ fontSize: '18px', padding: '10px' }}
        >
          <option value="">Select State</option>
          {Object.keys(statesWithCities).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {selectedState && (
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ marginLeft: '10px', fontSize: '18px', padding: '10px' }}
          >
            <option value="">Select City</option>
            {statesWithCities[selectedState].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginLeft: '10px', fontSize: '18px', padding: '10px', width: '200px' }}
        />
        <button onClick={handleLocationSearch} style={{ marginLeft: '20px', fontSize: '18px', padding: '10px' }}>Search</button>
        <button onClick={getUserLocation} style={{ marginLeft: '20px', fontSize: '18px', padding: '10px' }}>
          Use My Location
        </button>
        <button onClick={handleBestView} style={{ marginLeft: '20px', fontSize: '18px', padding: '10px' }}>
          Best View
        </button>
      </div>

      {searchHistory.length > 0 && (
        <div>
          <h3>Search History</h3>
          <ul>
            {searchHistory.map((entry, index) => (
              <li key={index} onClick={() => handleHistoryClick(entry)} style={{ cursor: 'pointer' }}>
                {entry.location}, {entry.city}, {entry.state}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div ref={mapRef} style={{ height: '600px', width: '100%', marginTop: '20px',marginLeft: '0px' }}></div>

      {routeInstructions.length > 0 && (
        <div>
          <h3>Route Instructions</h3>
          <ol>
            {routeInstructions.map((instruction, index) => (
              <li key={index}>
                {instruction.text} - {instruction.distance} meters
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default LocationSearchMap;
