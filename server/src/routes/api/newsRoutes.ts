import express from "express";
import { getTopBusinessHeadlines } from "./newsService.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const news = await getTopBusinessHeadlines();
    res.json(news);
  } catch (error) {
    console.error("Error in news route:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

export default router;
