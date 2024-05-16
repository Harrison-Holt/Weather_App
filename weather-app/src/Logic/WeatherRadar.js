import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherRadar = ({ lat, lon }) => {
  // Fallback coordinates if none provided
  const defaultLat = lat || 39.50;
  const defaultLon = lon || -98.35;
  
  // Define the current time in Unix format
  const currentTime = Math.floor(Date.now() / 1000);

  return (
    <div>
      {lat && lon ? (
        <MapContainer center={[lat, lon]} zoom={6} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TileLayer
            url={`https://maps.openweathermap.org/maps/2.0/radar/forecast/{z}/{x}/{y}?appid=${apiKey}&tm=${currentTime}`}
            attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
          />
          <Marker position={[lat, lon]}>
            <Popup>
              Weather Location
            </Popup>
          </Marker>
        </MapContainer>     
      ) : (
        <p>Map cannot be displayed. Please check your location data.</p>
      )}
    </div>
  );
};

export default WeatherRadar;




