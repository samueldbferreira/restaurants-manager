import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddSaleProductsUseCase } from "./AddSaleProductsUseCase";

class AddSaleProductsController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, saleId } = req.params;
		const { products } = req.body;

		const addSaleProductsUseCase = container.resolve(AddSaleProductsUseCase);

		const { count } = await addSaleProductsUseCase.execute({
			userId,
			restaurantId,
			saleId,
			products,
		});

		return res.status(200).json({ count });
	}
}

export { AddSaleProductsController };
