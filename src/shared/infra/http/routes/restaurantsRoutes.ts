import { Router } from "express";
import multer from "multer";
import { checkAuth } from "../middlewares/checkAuth";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { GetRestaurantController } from "../../../../modules/restaurants/useCases/getRestaurant/GetRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";
import { DeleteRestaurantController } from "../../../../modules/restaurants/useCases/deleteRestaurant/DeleteRestaurantController";
import { UpdateRestaurantController } from "../../../../modules/restaurants/useCases/updateRestaurant/UpdateRestaurantController";
import uploadConfig from "../../../../config/upload";

const uploadMiddleware = multer(uploadConfig.upload("tmp/restaurants"));

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const deleteRestaurantController = new DeleteRestaurantController();
const updateRestaurantController = new UpdateRestaurantController();

const restaurantsRoutes = Router();

restaurantsRoutes.use(checkAuth);

restaurantsRoutes.get(
	"/restaurants/:restaurantId",
	getRestaurantController.handle
);

restaurantsRoutes.delete(
	"/restaurants/:restaurantId",
	deleteRestaurantController.handle
);

restaurantsRoutes.patch(
	"/restaurants/:restaurantId",
	uploadMiddleware.single("photo"),
	updateRestaurantController.handle
);

restaurantsRoutes.post(
	"/restaurants",
	uploadMiddleware.single("photo"),
	createRestaurantController.handle
);

restaurantsRoutes.get("/restaurants", listRestaurantsController.handle);

export { restaurantsRoutes };
