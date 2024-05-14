import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { geolocated } from 'react-geolocated';

const API_KEY = WEATHER_API_KEY; 

function CurrentWeather({ coords }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords;
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          setWeather(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchWeather();
    }
  }, [coords]);

  if (!coords) {
    return <div>Getting your location...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <h1>Current Weather</h1>
      <p>Location: {weather.name}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(CurrentWeather);
