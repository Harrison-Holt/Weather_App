import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherMap from './WeatherMap';
import './current_weather.css';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [units, setUnits] = useState('imperial');

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
      fetchHistoricalData(location.lat, location.lon);
    }
  }, [location, units]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  function handleCitySubmit(event) {
    event.preventDefault();
    const parts = city.split(',');
    const cityName = parts[0].trim();
    fetchWeatherByCity(cityName);
  }

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setForecast(forecastResponse.data.list);

      const hourlyResponse = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setHourlyForecast(hourlyResponse.data.list);

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
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=10&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setForecast(forecastResponse.data.list);

      const hourlyResponse = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setHourlyForecast(hourlyResponse.data.list);

      setError(null);
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    }
  };

  const fetchHistoricalData = async (lat, lon) => {
    try {
      const currentTime = Math.floor(Date.now() / 1000);
      const historicalResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${currentTime}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setHistoricalData(historicalResponse.data);
    } catch (err) {
      setError('Error fetching historical data: ' + err.message);
    }
  };

  const toggleUnits = () => {
    setUnits(units === 'imperial' ? 'metric' : 'imperial');
  };

  const getWeatherIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

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
        <>
          <WeatherMap lat={location.lat} lon={location.lon} />
        </>
      )}
      {historicalData && (
        <div className="historical-data">
          <h2>Historical Data</h2>
          <p>Temperature: {Math.round(historicalData.current.temp)}°{units === 'imperial' ? 'F' : 'C'}</p>
          <p>Humidity: {Math.round(historicalData.current.humidity)}%</p>
          <p>Pressure: {Math.round(historicalData.current.pressure)} hPa</p>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;




