import { Router } from "express";
import { restaurantsRoutes } from "./restaurants.routes";

const routes = Router();

routes.use("/restaurants", restaurantsRoutes);

export { routes };
