import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherRadar from './WeatherRadar';
import './current_weather.css';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [units, setUnits] = useState('imperial');
  const [layerType, setLayerType] = useState('TA2');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!city) {
            setLocation({ lat: latitude, lon: longitude });
          }
        },
        (error) => {
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not available");
    }
  }, [city]);

  useEffect(() => {
    if (location.lat && location.lon && !city) {
      fetchWeatherByCoords(location.lat, location.lon);
    }
  }, [location, units]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    fetchWeatherByCity(city);
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  const convertTemperature = (tempKelvin) => {
    if (units === 'imperial') {
      return (tempKelvin - 273.15) * 9 / 5 + 32;
    } else {
      return tempKelvin - 273.15;
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const responses = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=${units}&appid=${WEATHER_API_KEY}`),
        axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`)
      ]);
      setWeather(responses[0].data);
      setForecast(responses[1].data.list);
      setHourlyForecast(responses[2].data.list);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const encodedCityName = encodeURIComponent(cityName);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodedCityName}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      const { lat, lon } = response.data.coord;
      setLocation({ lat, lon });
      fetchForecast(lat, lon);
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const responses = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=${units}&appid=${WEATHER_API_KEY}`),
        axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`)
      ]);
      setForecast(responses[0].data.list);
      setHourlyForecast(responses[1].data.list);
    } catch (err) {
      setError('Error fetching forecast data: ' + err.message);
    }
  };

  const toggleUnits = () => {
    setUnits(prevUnits => prevUnits === 'imperial' ? 'metric' : 'imperial');
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleCitySubmit} className="weather-form">
      <label htmlFor="city" className="visually-hidden">Enter City:</label>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleCityChange}
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      <button onClick={toggleUnits} className="unit-toggle-button">
        Toggle Units ({units === 'imperial' ? 'Fahrenheit' : 'Celsius'})
      </button>
      {error && <div className="error-message">Error: {error}</div>}
      {weather && (
        <div className="current-weather">
          <h2>{weather.name}</h2>
          <img src={getWeatherIcon(weather.weather[0].icon)} alt={weather.weather[0].description} />
          <p>Temperature: {Math.round(weather.main.temp)}°{units === 'imperial' ? 'F' : 'C'}</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {Math.round(weather.main.humidity)}%</p>
          <p>Pressure: {Math.round(weather.main.pressure)} hPa</p>
          <p>Wind Speed: {Math.round(weather.wind.speed)} {units === 'imperial' ? 'mph' : 'm/s'}</p>
        </div>
      )}
      {hourlyForecast.length > 0 && (
        <div className="hourly-forecast">
          <h2>24-Hour Forecast</h2>
          <div className="hourly-cards">
            {hourlyForecast.slice(0, 24).map((hour, index) => (
              <div key={index} className="hourly-card">
                <p>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <img src={getWeatherIcon(hour.weather[0].icon)} alt={hour.weather[0].description} />
                <p>Temp: {Math.round(hour.main.temp)}°{units === 'imperial' ? 'F' : 'C'}</p>
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
                <img src={getWeatherIcon(day.weather[0].icon)} alt={day.weather[0].description} />
                <p>Temp: {Math.round(day.temp.day)}°{units === 'imperial' ? 'F' : 'C'}</p>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {location.lat && location.lon && (
        <WeatherRadar lat={location.lat} lon={location.lon} initialType={layerType} />
      )}
    </div>
  );
}

export default CurrentWeather;
