import React from 'react'; 
import './homepage.css'; 
import CurrentWeather from '../Logic/current_weather.js'; 
function Homepage() {
    return (
        <main>
            <section className='current_weather'>
                <CurrentWeather /> {/* Use the CurrentWeather component */}
            </section>
        </main>
    ); 
}; 

export default Homepage;
