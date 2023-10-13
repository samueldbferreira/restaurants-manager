import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSalesUseCase } from "./ListSalesUseCase";

class ListSalesController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;

		const listSalesUseCase = container.resolve(ListSalesUseCase);

		const sales = await listSalesUseCase.execute(userId, restaurantId);

		return res.status(200).json(sales);
	}
}

export { ListSalesController };
