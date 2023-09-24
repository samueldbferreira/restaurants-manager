import { Router } from "express";

import { CreateCategoryController } from "../../../../modules/restaurants/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/restaurants/useCases/listCategories/ListCategoriesController";
import { CreateRestaurantController } from "../../../../modules/restaurants/useCases/createRestaurant/CreateRestaurantController";
import { GetRestaurantController } from "../../../../modules/restaurants/useCases/getRestaurant/GetRestaurantController";
import { ListRestaurantsController } from "../../../../modules/restaurants/useCases/listRestaurants/ListRestaurantsController";
import { DeleteRestaurantController } from "../../../../modules/restaurants/useCases/deleteRestaurant/DeleteRestaurantController";
import { CreateProductController } from "../../../../modules/restaurants/useCases/createProduct/CreateProductController";
import { ListProductsController } from "../../../../modules/restaurants/useCases/listProducts/ListProductsController";
import { GetProductController } from "../../../../modules/restaurants/useCases/getProduct/GetProductController";
import { DeleteCategoryController } from "../../../../modules/restaurants/useCases/deleteCategory/DeleteCategoryController";
import { DeleteProductController } from "../../../../modules/restaurants/useCases/deleteProduct/DeleteProductController";
import { UpdateProductController } from "../../../../modules/restaurants/useCases/updateProduct/UpdateProductController";
import { UpdateCategoryController } from "../../../../modules/restaurants/useCases/updateCategory/UpdateCategoryController";

const routes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const getProductController = new GetProductController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const deleteRestaurantController = new DeleteRestaurantController();

routes.get(
	"/restaurants/:restaurantId/products/:productId",
	getProductController.handle
);

routes.delete(
	"/restaurants/:restaurantId/products/:productId",
	deleteProductController.handle
);

routes.patch(
	"/restaurants/:restaurantId/products/:productId",
	updateProductController.handle
);

routes.post(
	"/restaurants/:restaurantId/products",
	createProductController.handle
);

routes.get(
	"/restaurants/:restaurantId/products",
	listProductsController.handle
);

routes.post(
	"/restaurants/:restaurantId/categories",
	createCategoryController.handle
);

routes.get(
	"/restaurants/:restaurantId/categories",
	listCategoriesController.handle
);

routes.delete(
	"/restaurants/:restaurantId/categories/:categoryId",
	deleteCategoryController.handle
);

routes.patch(
	"/restaurants/:restaurantId/categories/:categoryId",
	updateCategoryController.handle
);

routes.post("/restaurants", createRestaurantController.handle);

routes.get("/restaurants/:restaurantId", getRestaurantController.handle);

routes.get("/restaurants", listRestaurantsController.handle);

routes.delete("/restaurants/:restaurantId", deleteRestaurantController.handle);

export { routes };
