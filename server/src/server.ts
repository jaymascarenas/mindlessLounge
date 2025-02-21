const forceDatabaseRefresh = false;

import express from "express";
import sequelize from "./config/connection";
import routes from "./routes/index";
import weatherRoutes from "./routes/weatherRoutes";
import newsRoutes from "./routes/newsRoutes";
import path from "path";

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

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
