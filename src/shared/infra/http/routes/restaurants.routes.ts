import { Router } from "express";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";

const restaurantsRoutes = Router();

const createRestaurantController = new CreateRestaurantController();

restaurantsRoutes.post("/", createRestaurantController.handle);

export { restaurantsRoutes };
