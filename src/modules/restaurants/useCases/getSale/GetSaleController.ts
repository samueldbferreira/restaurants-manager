import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetSaleUseCase } from "./GetSaleUseCase";

class GetSaleController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, saleId } = req.params;

		const getSaleUseCase = container.resolve(GetSaleUseCase);

		const sale = await getSaleUseCase.execute(userId, restaurantId, saleId);

		return res.status(200).json(sale);
	}
}

export { GetSaleController };
