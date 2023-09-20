import { Router } from "express";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";

const restaurantsRoutes = Router();

const createRestaurantController = new CreateRestaurantController();
const listRestaurantsController = new ListRestaurantsController();

restaurantsRoutes.post("/", createRestaurantController.handle);
restaurantsRoutes.get("/", listRestaurantsController.handle);

export { restaurantsRoutes };
