import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSaleUseCase } from "./CreateSaleUseCase";

class CreateSaleController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;
		const { title, description, discount } = req.body;

		const createSaleUseCase = container.resolve(CreateSaleUseCase);

		const newSale = await createSaleUseCase.execute({
			userId,
			restaurantId,
			title,
			description,
			discount,
		});

		return res.status(201).json(newSale);
	}
}

export { CreateSaleController };
