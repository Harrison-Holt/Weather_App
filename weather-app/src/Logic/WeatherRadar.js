import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const weatherLayers = [
  { value: 'PAC0', label: 'Convective precipitation' },
  { value: 'PR0', label: 'Precipitation intensity' },
  { value: 'PA0', label: 'Accumulated precipitation' },
  { value: 'PAR0', label: 'Accumulated precipitation - rain' },
  { value: 'PAS0', label: 'Accumulated precipitation - snow' },
  { value: 'SD0', label: 'Depth of snow' },
  { value: 'WS10', label: 'Wind speed at 10 meters' },
  { value: 'WND', label: 'Wind direction and speed' },
  { value: 'APM', label: 'Atmospheric pressure' },
  { value: 'TA2', label: 'Air temperature at 2 meters' },
  { value: 'TD2', label: 'Dew point temperature' },
  { value: 'TS0', label: 'Soil temperature 0-10 cm' },
  { value: 'TS10', label: 'Soil temperature >10 cm' },
  { value: 'HRD0', label: 'Relative humidity' },
  { value: 'CL', label: 'Cloudiness' },
];

const WeatherRadar = ({ lat, lon, initialType = 'TA2' }) => {
  const mapContainerRef = useRef(null);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    if (lat && lon) {
      const map = L.map(mapContainerRef.current).setView([lat, lon], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const weatherLayerUrl = `http://maps.openweathermap.org/maps/2.0/weather/${type}/{z}/{x}/{y}?appid=${process.env.REACT_APP_WEATHER_API_KEY}&opacity=0.5`;

      const weatherLayer = L.tileLayer(weatherLayerUrl, {
        attribution: '&copy; OpenWeatherMap'
      }).addTo(map);

      return () => {
        map.remove();
        weatherLayer.remove();
      };
    }
  }, [lat, lon, type]);

  return (
    <div className="map-container">
      <div className="map-layer-select">
        <label htmlFor="layerType">Select Layer: </label>
        <select
          id="layerType"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {weatherLayers.map((layer) => (
            <option key={layer.value} value={layer.value}>
              {layer.label}
            </option>
          ))}
        </select>
      </div>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default WeatherRadar;
