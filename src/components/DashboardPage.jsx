import { useState, useEffect } from "react";
import axios from "axios";
import "./DashboardPage.css";

const WeatherDashboard = () => {
  // Set default values
  const [weatherData, setWeatherData] = useState(null);
  const [stateInput, setStateInput] = useState("Madhya Pradesh");
  const [city, setCity] = useState("Indore");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Send state and city as query parameters to the API
      const response = await axios.get("http://localhost:3500/weather", {
        params: { state: stateInput, city }
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData(null);
    }
    setLoading(false);
  };

  // Fetch default weather data on mount
  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div className="weather-dashboard">
      <h1>Weather Forecast</h1>
      
      {/* Input form for state and city */}
      <div className="input-form">
        <input
          type="text"
          placeholder="Enter State"
          value={stateInput}
          onChange={(e) => setStateInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {weatherData && (
        <>
          <h2>Weather in {weatherData.location}</h2>
          {/* <p>Current Humidity: {weatherData.current_humidity}%</p> */}
          <div className="forecast-container">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="forecast-box">
                <h3>{day.date}</h3>
                <p><strong>Avg Temp:</strong> {day.avg_temperature}°C</p>
                <p><strong>Condition:</strong> {day.condition}</p>
                <p><strong>Humidity:</strong> {day.humidity}%</p>
                <img src={`https:${day.icon}`} alt={day.condition} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
