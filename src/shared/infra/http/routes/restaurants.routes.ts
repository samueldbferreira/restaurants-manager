import { Router } from "express";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { GetRestaurantController } from "../../../../modules/restaurants/useCases/getRestaurant/GetRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";

const restaurantsRoutes = Router();

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();

restaurantsRoutes.post("/", createRestaurantController.handle);

restaurantsRoutes.get("/:id", getRestaurantController.handle);
restaurantsRoutes.get("/", listRestaurantsController.handle);

export { restaurantsRoutes };
