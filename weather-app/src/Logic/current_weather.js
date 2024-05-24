import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherRadar from './WeatherRadar';
import './current_weather.css';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
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
          // Set location only if city is not specified to avoid loop
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
  }, [city]); // Depend on city to avoid resetting location when a city is entered

  useEffect(() => {
    if (location.lat && location.lon && !city) { // Only fetch by coords if city isn't being used
      fetchWeatherByCoords(location.lat, location.lon);
      fetchHistoricalData(location.lat, location.lon);
    }
  }, [location, units]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCitySubmit = (event) => {
    event.preventDefault();
    fetchWeatherByCity(city);
  };

    // Define the getWeatherIcon function
    const getWeatherIcon = (icon) => {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
    };
  
    // Define the convertTemperature function
    const convertTemperature = (tempKelvin) => {
      if (units === 'imperial') {
        return (tempKelvin - 273.15) * 9 / 5 + 32; // Convert to Fahrenheit
      } else {
        return tempKelvin - 273.15; // Convert to Celsius
      }
    };
  
  const fetchHistoricalData = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(Date.now() / 1000) - 86400}&appid=${WEATHER_API_KEY}`
    );
    setHistoricalData(response.data.hourly); // Assuming hourly historical data
  } catch (err) {
    setError('Error fetching historical data: ' + err.message);
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
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${WEATHER_API_KEY}`
      );
      setWeather(response.data);
      const { lat, lon } = response.data.coord;
      setLocation({ lat, lon }); // Update location to fetched city's coordinates
    } catch (err) {
      setError('Error fetching weather data: ' + err.message);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    }
  };

  const toggleUnits = () => {
    setUnits(prevUnits => prevUnits === 'imperial' ? 'metric' : 'imperial');
  };

  const handleToggleHistoricalData = () => {
    setShowHistoricalData(prevShow => !prevShow);
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
          <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
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
      <button onClick={handleToggleHistoricalData} className="unit-toggle-button">
        {showHistoricalData ? 'Hide Historical Data' : 'Show Historical Data'}
      </button>
      {showHistoricalData && historicalData.length > 0 && (
        <div className="historical-data">
          <h2>Historical Data</h2>
          <div className="historical-cards">
            {historicalData.map((data, index) => (
              <div key={index} className="historical-card">
                <p>Month: {data.month}</p>
                <p>Day: {data.day}</p>
                <p>Mean Temp: {Math.round(convertTemperature(data.temp.mean))}°{units === 'imperial' ? 'F' : 'C'}</p>
                <p>Record Min Temp: {Math.round(convertTemperature(data.temp.record_min))}°{units === 'imperial' ? 'F' : 'C'}</p>
                <p>Record Max Temp: {Math.round(convertTemperature(data.temp.record_max))}°{units === 'imperial' ? 'F' : 'C'}</p>
                <p>Mean Humidity: {data.humidity.mean}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
  
