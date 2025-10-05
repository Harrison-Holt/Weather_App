import { useEffect, useState } from "react";
import { useContext } from "react";
import { WeatherContext } from "./Context/WeatherContext";
import Footer from "./UI/Footer";
import Header from "./UI/Header";
import Form from "./Form";
import { Container } from '@mui/material'; 
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

function Home() {

    const { city, weather, error, setCity, setWeather, setError } = useContext(WeatherContext); 
    const [input, setInput] = useState('');  

    useEffect(() => {
        if(!city) return; 

        async function fetch_weather() {
            try {

                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                 const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no&days=7&alerts=no`;

                const response = await fetch(url); 
                const data = await response.json(); 
                console.log(data); 

                if(!response.ok) {
                    console.error(`Error fetch data! Status: ${response.status}`); 
                    setError("Error fetching weather data!");  
                    return; 
                }

                setWeather(data); 
                
                const simple_weather_report = {
                    location: data.location?.name, 
                    region: data.location?.region, 
                    condition: data.condition, 
                    current: data.current,  
                    forecast: data.forecast
                }

                localStorage.setItem("weatherData", JSON.stringify(simple_weather_report)); 

            } catch(err) {
                console.error("Error fetching weather app: ", err);
                setError("Error fetching weather data!"); 
                setCity(null); 
            } 
        }

        fetch_weather(); 
    }, [city]); 


    const handleFormChange = (value) => {
        setInput(value); 
    }

    const submitForm = (e) => {
        e.preventDefault(); 
        setCity(input.trim())
    }

    return (
        <>
        <Header />
        <Container maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>

            <Form value={input} onChange={handleFormChange} onSubmit={submitForm}/>
            <CurrentWeather error={error} weather={weather} />
            <Forecast weather={weather} />

        </Container>
        <Footer />
        </>
    ); 
}

export default Home; 