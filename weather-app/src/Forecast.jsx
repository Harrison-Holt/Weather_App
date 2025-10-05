import { Typography, Card, Box } from "@mui/material";
import { useContext } from "react";
import { WeatherContext } from "./Context/WeatherContext";

function Forecast() {

    const { weather } = useContext(WeatherContext); 

    if(!weather) {
        return (
            <>
            <Typography variant="h6" sx={{ mt: 3 }}>No Forecast Availabile</Typography>
            </>
        )
    }

    return (
        <>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 3 }}> 7 Day Forecast </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%'}}>
                {weather.forecast?.forecastday?.map((day, index) => (
                    <Card key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1, width: '100%', minWidth: 180 }}>
                        <Typography variant="h6">{day.date}</Typography>
                        <img src={day.day?.condition?.icon} />
                        <Typography variant="body1">{day.day?.condition?.text}</Typography>
                        <Typography variant="body1"> High: {day.day?.maxtemp_f} F</Typography>
                        <Typography variant="body1"> Low: {day.day?.mintemp_f} F</Typography>
                    </Card>
                ))}; 
            </Box>
        </>
    ); 
}


export default Forecast; 