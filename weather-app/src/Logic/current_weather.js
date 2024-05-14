import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
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
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [location]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    fetchWeatherByCity(city);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null); // Clear previous weather data
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null); // Clear previous weather data
    }
  };

  return (
    <div>
      <h1>Current Weather</h1>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <div>Error: {error}</div>}
      {weather ? (
        <div>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <div>Enter a city to get the weather information.</div>
      )}
    </div>
  );
}

export default CurrentWeather;


