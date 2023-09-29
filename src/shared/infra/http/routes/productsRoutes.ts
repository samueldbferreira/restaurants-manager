import { Router } from "express";
import { CreateProductController } from "../../../../modules/restaurants/useCases/createProduct/CreateProductController";
import { ListProductsController } from "../../../../modules/restaurants/useCases/listProducts/ListProductsController";
import { GetProductController } from "../../../../modules/restaurants/useCases/getProduct/GetProductController";
import { DeleteProductController } from "../../../../modules/restaurants/useCases/deleteProduct/DeleteProductController";
import { UpdateProductController } from "../../../../modules/restaurants/useCases/updateProduct/UpdateProductController";
import { checkAuth } from "../middlewares/checkAuth";

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const getProductController = new GetProductController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

const productsRoutes = Router();

productsRoutes.use(checkAuth);

productsRoutes.get(
	"/restaurants/:restaurantId/products/:productId",
	getProductController.handle
);

productsRoutes.delete(
	"/restaurants/:restaurantId/products/:productId",
	deleteProductController.handle
);

productsRoutes.patch(
	"/restaurants/:restaurantId/products/:productId",
	updateProductController.handle
);

productsRoutes.post(
	"/restaurants/:restaurantId/products",
	createProductController.handle
);

productsRoutes.get(
	"/restaurants/:restaurantId/products",
	listProductsController.handle
);

export { productsRoutes };
