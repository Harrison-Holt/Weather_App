import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './current_weather.css'; 

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
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
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setForecast(forecastResponse.data.list);

      const hourlyResponse = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setHourlyForecast(hourlyResponse.data.list);

      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null); // Clear previous weather data
      setForecast([]); // Clear previous forecast data
      setHourlyForecast([]); // Clear previous hourly forecast data
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setForecast(forecastResponse.data.list);

      const hourlyResponse = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`
      );
      setHourlyForecast(hourlyResponse.data.list);

      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null); // Clear previous weather data
      setForecast([]); // Clear previous forecast data
      setHourlyForecast([]); // Clear previous hourly forecast data
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleCitySubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      {error && <div className="error-message">Error: {error}</div>}
      {weather && (
        <div className="current-weather">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°F</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      {hourlyForecast.length > 0 && (
        <div className="hourly-forecast">
          <h2>24-Hour Forecast</h2>
          <div className="hourly-cards">
            {hourlyForecast.slice(0, 24).map((hour, index) => (
              <div key={index} className="hourly-card">
                <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>Temp: {hour.main.temp}°F</p>
                <p>{hour.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="forecast">
          <h2>10-Day Forecast</h2>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {day.temp.day}°F</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;




