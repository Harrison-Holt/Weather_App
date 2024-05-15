import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherRadar = ({ lat, lon, zoom }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const tileLayerUrl = `https://maps.openweathermap.org/maps/2.0/radar/forecast/{z}/{x}/{y}?appid=${apiKey}&tm=${Math.floor(Date.now() / 1000)}`;

  return (
    <MapContainer center={[lat, lon]} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer url={tileLayerUrl} />
    </MapContainer>
  );
};

export default WeatherRadar;
