import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (error) => {
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not available");
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${WEATHER_API_KEY}`
          );
          setWeather(response.data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchWeather();
    }
  }, [location]);

  if (!location.lat || !location.lon) {
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
      <p>Temperature: {weather.main.temp}°F</p>
      <p>Weather: {weather.weather[0].description}</p>
    </div>
  );
}

export default CurrentWeather;

