import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherRadar = ({ lat, lon }) => {
  // Fallback coordinates (e.g., center of the US) if none provided
  const defaultLat = lat || 39.50;
  const defaultLon = lon || -98.35;
  
  return (
    <div>
      {lat && lon ? (
        <MapContainer center={[defaultLat, defaultLon]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[defaultLat, defaultLon]}></Marker>
        </MapContainer>
      ) : (
        <p>Map cannot be displayed. Please check your location data.</p>
      )}
    </div>
  );
};

export default WeatherRadar;

