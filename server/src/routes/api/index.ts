import { Router } from "express";
import userRoutes from "./user-routes.js";
import postRoutes from "./post-routes.js";
import profileRoutes from "./profile-routes.js";
import weatherRoutes from "./weatherRoutes.js";
import newsRoutes from "./newsRoutes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/profile", profileRoutes);
router.use("/weather", weatherRoutes);
router.use("/news", newsRoutes);

export default router;
