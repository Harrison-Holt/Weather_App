import React from 'react'; 
import './homepage.css'; 

function Homepage() {
    return (
        <main>
            <section className='current_weather'>
                <h1>{location}</h1>
            </section>
        </main>
    ); 
}; 

export default Homepage; 