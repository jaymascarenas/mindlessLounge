import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";
import weatherRoutes from "./weatherRoutes.js";
import newsRoutes from "./newsRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", authenticateToken, apiRoutes);
router.use("/weather", weatherRoutes);
router.use("/news", newsRoutes);

export default router;
