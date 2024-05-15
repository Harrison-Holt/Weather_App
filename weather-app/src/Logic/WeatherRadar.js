import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherRadar = ({ lat, lon, zoom }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [tileLayerUrl, setTileLayerUrl] = useState('');

  useEffect(() => {
    // Calculate the nearest 10 minutes timestamp
    const currentTime = Math.floor(Date.now() / 600000) * 600000;
    const newTileLayerUrl = `https://maps.openweathermap.org/maps/2.0/radar/forecast/{z}/{x}/{y}?appid=${apiKey}&tm=${currentTime}`;
    setTileLayerUrl(newTileLayerUrl);
  }, [apiKey]);

  if (!lat || !lon || !tileLayerUrl) return null;

  return (
    <MapContainer center={[lat, lon]} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url={tileLayerUrl}
        attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
      />
    </MapContainer>
  );
};

export default WeatherRadar;

