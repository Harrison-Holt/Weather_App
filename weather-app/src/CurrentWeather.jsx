import { Card, Typography, Alert, Container } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "./Context/WeatherContext";

function CurrentWeather() {

    const { weather, error } = useContext(WeatherContext); 
    console.log(weather); 

    if (!weather) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body1">Enter a city to view weather data.</Typography>
      </Container>
    );
    }

    return (
        <Container maxWidth={false}>
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 5 }}>
            {error && (<Alert severity="error" sx={{ m: 2 }}>{error}</Alert>)}
            <img src={weather.current?.condition.icon} />
            <Typography variant="h6" sx={{ textAlign: 'center' }}>{weather.location?.name}, {weather.location?.region}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>Temperature: {weather.current?.temp_f} F</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>Condition: {weather.current?.condition?.text}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>Humidity: {weather.current?.humidity}</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>Feels like: {weather.current?.feelslike_f} F</Typography>
        </Card>
        </Container>
    ); 
}

export default CurrentWeather; 