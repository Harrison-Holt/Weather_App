import { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext(); 

export function WeatherProvider({ children }) {

    const [city, setCity] = useState(''); 
    const [error, setError] = useState(null)
    const [weather, setWeather] = useState(() => {
        const weather_report = localStorage.getItem("weatherData"); 
        return weather_report ? JSON.parse(weather_report) : null; 
    }); 
    
    useEffect(() => {
    localStorage.setItem("weatherData", JSON.stringify(weather));
    }, [weather]);

    return (
    <WeatherContext.Provider value={{city, setCity, weather, setWeather, error, setError}}>
        {children}
    </WeatherContext.Provider>
    ); 
}