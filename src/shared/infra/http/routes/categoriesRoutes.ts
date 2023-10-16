import { Router } from "express";
import { CreateCategoryController } from "../../../../modules/restaurants/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../../../../modules/restaurants/useCases/listCategories/ListCategoriesController";
import { DeleteCategoryController } from "../../../../modules/restaurants/useCases/deleteCategory/DeleteCategoryController";
import { UpdateCategoryController } from "../../../../modules/restaurants/useCases/updateCategory/UpdateCategoryController";
import { checkAuth } from "../middlewares/checkAuth";
import { GetCategoryController } from "../../../../modules/restaurants/useCases/getCategory/GetCategoryController";

const getCategoryController = new GetCategoryController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();

const categoriesRoutes = Router();

categoriesRoutes.use(checkAuth);

categoriesRoutes.get(
	"/restaurants/:restaurantId?/categories/:categoryId",
	getCategoryController.handle
);

categoriesRoutes.delete(
	"/restaurants/:restaurantId?/categories/:categoryId",
	deleteCategoryController.handle
);

categoriesRoutes.patch(
	"/restaurants/:restaurantId?/categories/:categoryId",
	updateCategoryController.handle
);

categoriesRoutes.post(
	"/restaurants/:restaurantId?/categories",
	createCategoryController.handle
);

categoriesRoutes.get(
	"/restaurants/:restaurantId?/categories",
	listCategoriesController.handle
);

export { categoriesRoutes };
