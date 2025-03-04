import { WeatherData } from '../interfaces/WeatherData';
import Auth from '../utils/auth';

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`http://localhost:3000/api/weather?city=${city}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data as WeatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Function to get weather for London by default
export async function getWeather(): Promise<WeatherData> {
  // Using London as default city
  const defaultCity = 'London';
  return getWeatherByCity(defaultCity);
}