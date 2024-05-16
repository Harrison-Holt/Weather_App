// src/components/MapViewer.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { geocode } from 'esri-leaflet-geocoder';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;;
const defaultZoom = 7;

function MapViewer() {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosition([latitude, longitude]);
            },
            () => {
                // Default to Dallas, TX if geolocation fails
                setPosition([32.7767, -96.7970]);
            }
        );
    }, []);

    const updateLocation = (location) => {
        geocode().text(location).run((err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            setPosition([results.latlng.lat, results.latlng.lng]);
        });
    };

    return (
        <div>
            <input type="text" placeholder="Enter location (e.g., Dallas, TX)" 
                   onBlur={(e) => updateLocation(e.target.value)} />
            {position && (
                <MapContainer center={position} zoom={defaultZoom} style={{ height: '500px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <PrecipitationLayer position={position} />
                </MapContainer>
            )}
        </div>
    );
}

function PrecipitationLayer({ position }) {
    const map = useMap();

    useEffect(() => {
        const timestamp = Math.floor(Date.now() / 1000);
        const tileUrl = `https://maps.openweathermap.org/maps/2.0/radar/forecast/${defaultZoom}/${Math.floor(position[1])}/${Math.floor(position[0])}?appid=${apiKey}&tm=${timestamp}`;
        const layer = L.tileLayer(tileUrl);
        map.addLayer(layer);
        return () => {
            map.removeLayer(layer);
        };
    }, [position, map]);

    return null;
}

export default MapViewer;





