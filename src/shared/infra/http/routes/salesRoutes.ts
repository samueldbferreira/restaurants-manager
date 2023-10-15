import { Router } from "express";
import { CreateSaleController } from "../../../../modules/restaurants/useCases/createSale/CreateSaleController";
import { GetSaleController } from "../../../../modules/restaurants/useCases/getSale/GetSaleController";
import { ListSalesController } from "../../../../modules/restaurants/useCases/listSales/ListSalesController";
import { checkAuth } from "../middlewares/checkAuth";
import { UpdateSaleController } from "../../../../modules/restaurants/useCases/updateSale/UpdateSaleController";

const getSaleController = new GetSaleController();
const updateSaleController = new UpdateSaleController();
const listSalesController = new ListSalesController();
const createSaleController = new CreateSaleController();

const salesRoutes = Router();

salesRoutes.use(checkAuth);

salesRoutes.get(
	"/restaurants/:restaurantId/sales/:saleId",
	getSaleController.handle
);

salesRoutes.patch(
	"/restaurants/:restaurantId/sales/:saleId",
	updateSaleController.handle
);

salesRoutes.get("/restaurants/:restaurantId/sales", listSalesController.handle);

salesRoutes.post(
	"/restaurants/:restaurantId/sales",
	createSaleController.handle
);

export { salesRoutes };
