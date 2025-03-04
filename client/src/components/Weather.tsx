import React, { useEffect, useState } from "react";
import { getWeather } from "../api/weather.API";
import { WeatherData } from "../interfaces/WeatherData";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeather();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError("Failed to load weather data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading weather...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return null;

  return (
    <div className="weather-widget">
      <h5 className="text-center fw-bold">Weather</h5>
      <div className="text-center mb-3">
        <h6>
          {weatherData.name}, {weatherData.sys.country}
        </h6>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            style={{ width: "50px", height: "50px" }}
          />
          <span className="fs-4">{Math.round(weatherData.main.temp)}°C</span>
        </div>
        <div>{weatherData.weather[0].description}</div>
      </div>
      <div className="weather-details small">
        <div>
          <strong>Feels like:</strong> {Math.round(weatherData.main.feels_like)}
          °C
        </div>
        <div>
          <strong>Humidity:</strong> {weatherData.main.humidity}%
        </div>
        <div>
          <strong>Wind:</strong> {weatherData.wind.speed} m/s
        </div>
      </div>
    </div>
  );
};

export default Weather;
