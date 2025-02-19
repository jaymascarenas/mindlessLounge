import express from "express";
import { getWeatherForecast } from "./api/weatherService";

const router = express.Router();

router.get(
  "/weather",
  async (req, res): Promise<express.Response | undefined> => {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res
          .status(400)
          .json({ error: "Latitude and longitude are required" });
      }

      const weatherData = await getWeatherForecast(
        lat as string,
        lon as string
      );
      return res.json(weatherData);
    } catch (error) {
      console.error("Error in weather route:", error);
      return res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
);

export default router;
