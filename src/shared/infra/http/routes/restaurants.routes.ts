import { Router } from "express";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { GetRestaurantController } from "../../../../modules/restaurants/useCases/getRestaurant/GetRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";
import { DeleteRestaurantController } from "../../../../modules/restaurants/useCases/deleteRestaurant/DeleteRestaurantController";

const restaurantsRoutes = Router();

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const deleteRestaurantController = new DeleteRestaurantController();

restaurantsRoutes.post("/", createRestaurantController.handle);
restaurantsRoutes.get("/:id", getRestaurantController.handle);
restaurantsRoutes.get("/", listRestaurantsController.handle);
restaurantsRoutes.delete("/:id", deleteRestaurantController.handle);

export { restaurantsRoutes };
