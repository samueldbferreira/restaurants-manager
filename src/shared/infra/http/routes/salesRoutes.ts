import { Router } from "express";
import { CreateSaleController } from "../../../../modules/restaurants/useCases/createSale/CreateSaleController";
import { GetSaleController } from "../../../../modules/restaurants/useCases/getSale/GetSaleController";
import { ListSalesController } from "../../../../modules/restaurants/useCases/listSales/ListSalesController";
import { checkAuth } from "../middlewares/checkAuth";

const createSaleController = new CreateSaleController();
const getSaleController = new GetSaleController();
const listSalesController = new ListSalesController();

const salesRoutes = Router();

salesRoutes.use(checkAuth);

salesRoutes.get(
	"/restaurants/:restaurantId/sales/:saleId",
	getSaleController.handle
);

salesRoutes.get("/restaurants/:restaurantId/sales", listSalesController.handle);

salesRoutes.post(
	"/restaurants/:restaurantId/sales",
	createSaleController.handle
);

export { salesRoutes };
