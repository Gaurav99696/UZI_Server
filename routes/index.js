import userRoutes from "./user.routes.js";
import gameRoutes from "./game.router.js";

const initRoutes = (app) => {
  app.use("/api/users", userRoutes);
  app.use("/api/game", gameRoutes);
};

export default initRoutes;
