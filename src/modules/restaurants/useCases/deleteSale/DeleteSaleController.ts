import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteSaleUseCase } from "./DeleteSaleUseCase";

class DeleteSaleController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, saleId } = req.params;

		const deleteSaleUseCase = container.resolve(DeleteSaleUseCase);

		await deleteSaleUseCase.execute(userId, restaurantId, saleId);

		return res.status(204).send();
	}
}

export { DeleteSaleController };
