import { Router } from "express";
import authRoutes from "./auth-routes.js";
import apiRoutes from "./api/index.js";
import { authenticateToken } from "../middleware/auth.js";
import weatherRoutes from "./weatherRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", authenticateToken, apiRoutes);
router.use("/weather", weatherRoutes);

export default router;
