import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { usersRoutes } from "./usersRoutes";
import { restaurantsRoutes } from "./restaurantsRoutes";
import { categoriesRoutes } from "./categoriesRoutes";
import { salesRoutes } from "./salesRoutes";
import { productsRoutes } from "./productsRoutes";

const routes = Router();

routes.use(authRoutes);
routes.use(usersRoutes);
routes.use(categoriesRoutes);
routes.use(salesRoutes);
routes.use(productsRoutes);
routes.use(restaurantsRoutes);

export { routes };
