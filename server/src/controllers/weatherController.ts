import { Request, Response } from "express";

const API_KEY = process.env.WEATHER_API_KEY;

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
