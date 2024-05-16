import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherRadar = ({ lat, lon }) => {
  // Ensuring the initial timestamp is rounded down to the nearest 10 minutes
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000 / 600) * 600);
  
  useEffect(() => {
    console.log(`API Key: ${apiKey}`); // Log the API key to ensure it's being loaded
  }, []);

  const updateTimestamp = (amount) => {
    setTimestamp(prevTimestamp => prevTimestamp + amount);
  };

  return (
    <div>
      {lat && lon ? (
        <div>
          <MapContainer center={[lat, lon]} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <TileLayer
              url={`https://maps.openweathermap.org/maps/2.0/radar/forecast/{z}/{x}/{y}?appid=${apiKey}&tm=${timestamp}`}
              attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
            />
            <Marker position={[lat, lon]}>
              <Popup>Weather Location</Popup>
            </Marker>
          </MapContainer>
          <div className="controls">
            <button onClick={() => updateTimestamp(-600)}>Rewind</button>
            <button onClick={() => updateTimestamp(600)}>Forward</button>
          </div>
        </div>
      ) : (
        <p>Map cannot be displayed. Please check your location data.</p>
      )}
    </div>
  );
};

export default WeatherRadar;





