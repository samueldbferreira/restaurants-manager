import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSaleUseCase } from "./UpdateSaleUseCase";

class UpdateSaleController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, saleId } = req.params;
		const { title, description, discount } = req.body;

		const updateSaleUseCase = container.resolve(UpdateSaleUseCase);

		const updatedSale = await updateSaleUseCase.execute({
			userId,
			restaurantId,
			saleId,
			title,
			description,
			discount,
		});

		return res.status(200).json(updatedSale);
	}
}

export { UpdateSaleController };
