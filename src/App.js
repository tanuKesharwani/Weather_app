import React, { useState } from 'react';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const API_KEY = 'fc707cb963c39d98e56130246220c6bf'; // Your OpenWeatherMap API key

    const fetchWeather = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'city') {
            setCity(value);
        } else if (name === 'country') {
            setCountry(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    return (
        <div className="App" style={{ width:"100%" }}>
            <h1 className="app-title">Weather App</h1>
            <form onSubmit={handleSubmit} className="weather-form">
                <input type="text" name="city" value={city} onChange={handleChange} placeholder="Enter city" className="input-city" />
                <input type="text" name="country" value={country} onChange={handleChange} placeholder="Enter country" className="input-country" />
                <button type="submit" className="submit-button">Get Weather</button>
            </form>
            {weather && (
                <div className="weather-details">
                    <h2 className="weather-city">{weather.name}, {weather.sys.country}</h2>
                    <p className="weather-description">{weather.weather[0].description}</p>
                    <p className="weather-temperature">Temperature: {weather.main.temp}°C</p>
                    <p className="weather-humidity">Humidity: {weather.main.humidity}%</p>
                    <p className="weather-wind">Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default App;
