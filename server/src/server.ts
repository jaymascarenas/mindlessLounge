const forceDatabaseRefresh = false;

import express from "express";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
import weatherRoutes from "./routes/api/weatherRoutes.js";
import newsRoutes from "./routes/api/newsRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("../client/dist"));

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
