import React, { useState } from "react";
import { getWeatherByCityName } from "./weatherService";
import "./WeatherForecast.css";

const WeatherForecast = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCityName(city);
      setWeatherData(data);
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherTables = () => {
    return (
      <div className="weather-tables-row">
        {weatherData.map((day, index) => (
          <div key={index} className="weather-table-container">
            <table className="weather-table">
              <thead>
                <tr  className="head_color">
                  <th colSpan="2">
                    {new Date(day.dt_txt).toLocaleDateString()}
                  </th>
                </tr>
                <tr>
                  <th colSpan="2">Temperature: {day.main.temp} °C</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Min Temperature</td>
                  <td>Max Temperature</td>
                </tr>
                <tr>
                  <td>{day.main.temp_min} °C</td>
                  <td>{day.main.temp_max} °C</td>
                </tr>
                <tr>
                  <td>Pressure</td>
                  <td>{day.main.pressure} hPa</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{day.main.humidity}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="weather-forecast container mt-5">
      <header className="header">
        <h1>Weather in Your City</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary ml-2">
            Search
          </button>
        </div>
        {loading && <div className="loader mt-3">Loading...</div>}
        {error && <div className="error mt-3">{error}</div>}
      </header>
      <div className="forecast-table mt-3">
        {weatherData.length > 0 && renderWeatherTables()}
      </div>
    </div>
  );
};

export default WeatherForecast;
