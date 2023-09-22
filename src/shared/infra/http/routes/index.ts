import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/restaurants/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/restaurants/useCases/listCategories/ListCategoriesController";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { GetRestaurantController } from "../../../../modules/restaurants/useCases/getRestaurant/GetRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";
import { DeleteRestaurantController } from "../../../../modules/restaurants/useCases/deleteRestaurant/DeleteRestaurantController";
import { CreateProductController } from "../../../../modules/restaurants/useCases/createProduct/CreateProductController";

const routes = Router();

const createProductController = new CreateProductController();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const deleteRestaurantController = new DeleteRestaurantController();

//routes.get("/restaurants/:restaurantId/products/:productId"); //get single product
//routes.patch("/restaurants/:restaurantId/products/:productId"); //update product
routes.post("/restaurants/:restaurantId/products", createProductController.handle); //add product
//routes.get("/restaurants/:restaurantId/products");  // list all the products of a restaurant + query params to filter

routes.post(
	"/restaurants/:restaurantId/categories",
	createCategoryController.handle
);
routes.get(
	"/restaurants/:restaurantId/categories",
	listCategoriesController.handle
);

routes.post("/restaurants", createRestaurantController.handle);
routes.get("/restaurants/:restaurantId", getRestaurantController.handle);
routes.get("/restaurants", listRestaurantsController.handle);
routes.delete("/restaurants/:restaurantId", deleteRestaurantController.handle);

export { routes };
