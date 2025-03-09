import userRoutes from "./user.routes.js";

const initRoutes = (app) => {
  app.use("/api/users", userRoutes);
};

export default initRoutes;
