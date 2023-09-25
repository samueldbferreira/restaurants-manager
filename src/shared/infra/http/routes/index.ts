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
import { UpdateRestaurantController } from "../../../../modules/restaurants/useCases/updateRestaurant/UpdateRestaurantController";
import { CreateSaleController } from "../../../../modules/restaurants/useCases/createSale/CreateSaleController";
import { GetSaleController } from "../../../../modules/restaurants/useCases/getSale/GetSaleController";

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

const createSaleController = new CreateSaleController();
const getSaleController = new GetSaleController();

const createRestaurantController = new CreateRestaurantController();
const getRestaurantController = new GetRestaurantController();
const listRestaurantsController = new ListRestaurantsController();
const deleteRestaurantController = new DeleteRestaurantController();
const updateRestaurantController = new UpdateRestaurantController();

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

routes.get(
	"/restaurants/:restaurantId/sales/:saleId",
	getSaleController.handle
);

routes.post("/restaurants/:restaurantId/sales", createSaleController.handle);

routes.post("/restaurants", createRestaurantController.handle);

routes.get("/restaurants/:restaurantId", getRestaurantController.handle);

routes.get("/restaurants", listRestaurantsController.handle);

routes.delete("/restaurants/:restaurantId", deleteRestaurantController.handle);

routes.patch("/restaurants/:restaurantId", updateRestaurantController.handle);

export { routes };
