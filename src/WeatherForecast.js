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

  return (
    <div className="weather-forecast">
      <header className="header">
        <h1>Weather in Your City</h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <div className="loader">Loading...</div>}
        {error && <div className="error">{error}</div>}
      </header>
      <div className="forecast-table">
        {weatherData.length > 0 && (
          <table>
            <thead>
              <tr>
                {weatherData.map((day, index) => (
                  <th key={index}>
                    {new Date(day.dt_txt).toLocaleDateString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {weatherData.map((day, index) => (
                  <td key={index}>
                    <div className="date">
                      {new Date(day.dt_txt).toLocaleDateString()}
                    </div>
                    <div>{day.main.temp} °C</div>
                    <table>
                      <thead>
                        <tr>
                          <td>Min</td>
                          <td>Max</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {day.main.temp_min} °C</td>
                          <td> {day.main.temp_max} °C</td>
                        </tr>
                        <tr>
                          <td> Pressure </td>
                          <td> {day.main.pressure} hPa </td>
                        </tr>
                        <tr>
                          <td> Humidity </td>
                          <td> {day.main.humidity}% </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;


