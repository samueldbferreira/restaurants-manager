import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveSaleProductsUseCase } from "./RemoveSaleProductsUseCase";

class RemoveSaleProductsController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, saleId } = req.params;
		const { products } = req.body;

		const removeSaleProductsUseCase = container.resolve(
			RemoveSaleProductsUseCase
		);

		const { count } = await removeSaleProductsUseCase.execute({
			userId,
			restaurantId,
			saleId,
			products,
		});

		return res.status(204).json({ count });
	}
}

export { RemoveSaleProductsController };
