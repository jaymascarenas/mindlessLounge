const forceDatabaseRefresh = false;

import express from "express";
import sequelize from "./config/connection.js"; // Make sure this file exists in dist/config/
import routes from "./routes/index.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

// Serves the images
app.use(`/images`, express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(routes);
app.use("/api", weatherRoutes);
app.use("/api", newsRoutes);
app.use("/api", authRoutes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
