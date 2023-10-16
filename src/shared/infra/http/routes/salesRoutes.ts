import { Router } from "express";
import { CreateSaleController } from "../../../../modules/restaurants/useCases/createSale/CreateSaleController";
import { GetSaleController } from "../../../../modules/restaurants/useCases/getSale/GetSaleController";
import { ListSalesController } from "../../../../modules/restaurants/useCases/listSales/ListSalesController";
import { checkAuth } from "../middlewares/checkAuth";
import { UpdateSaleController } from "../../../../modules/restaurants/useCases/updateSale/UpdateSaleController";
import { AddSaleProductsController } from "../../../../modules/restaurants/useCases/addSaleProducts/AddSaleProductsController";
import { RemoveSaleProductsController } from "../../../../modules/restaurants/useCases/removeSaleProducts/RemoveSaleProductsController";
import { DeleteSaleController } from "../../../../modules/restaurants/useCases/deleteSale/DeleteSaleController";

const addSaleProductsController = new AddSaleProductsController();
const removeSaleProductsController = new RemoveSaleProductsController();
const getSaleController = new GetSaleController();
const updateSaleController = new UpdateSaleController();
const deleteSaleController = new DeleteSaleController();
const listSalesController = new ListSalesController();
const createSaleController = new CreateSaleController();

const salesRoutes = Router();

salesRoutes.use(checkAuth);

salesRoutes.post(
	"/restaurants/:restaurantId/sales/:saleId/products",
	addSaleProductsController.handle
);

salesRoutes.delete(
	"/restaurants/:restaurantId/sales/:saleId/products",
	removeSaleProductsController.handle
);

salesRoutes.get(
	"/restaurants/:restaurantId/sales/:saleId",
	getSaleController.handle
);

salesRoutes.patch(
	"/restaurants/:restaurantId/sales/:saleId",
	updateSaleController.handle
);

salesRoutes.delete(
	"/restaurants/:restaurantId/sales/:saleId",
	deleteSaleController.handle
);

salesRoutes.get("/restaurants/:restaurantId/sales", listSalesController.handle);

salesRoutes.post(
	"/restaurants/:restaurantId/sales",
	createSaleController.handle
);

export { salesRoutes };
