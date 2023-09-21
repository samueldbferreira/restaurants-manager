import { Router } from "express";
import { restaurantsRoutes } from "./restaurants.routes";
import { categoriesRoutes } from "./categories.routes";

const routes = Router();

routes.use("/restaurants/categories", categoriesRoutes);
routes.use("/restaurants", restaurantsRoutes);

export { routes };
