import express from "express";
import { getWeatherForecast } from "./weatherService.js";

const router = express.Router();

router.get("/", async (req, res): Promise<express.Response | undefined> => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const weatherData = await getWeatherForecast(city as string);
    return res.json(weatherData);
  } catch (error) {
    console.error("Error in weather route:", error);
    return res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
