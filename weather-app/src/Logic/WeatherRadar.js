import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherRadar = ({ lat, lon, type = 'TA2', date }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (lat && lon) {
      const map = L.map(mapContainerRef.current).setView([lat, lon], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const weatherLayerUrl = `http://maps.openweathermap.org/maps/2.0/weather/${type}/{z}/{x}/{y}?appid=${process.env.REACT_APP_WEATHER_API_KEY}&opacity=0.5${date ? `&date=${date}` : ''}`;

      L.tileLayer(weatherLayerUrl, {
        attribution: '&copy; OpenWeatherMap'
      }).addTo(map);

      return () => map.remove();
    }
  }, [lat, lon, type, date]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px', marginTop: '20px' }} />;
};

export default WeatherRadar;





