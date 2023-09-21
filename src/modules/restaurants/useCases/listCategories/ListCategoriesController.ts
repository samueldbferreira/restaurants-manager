import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
	async handle(req: Request, res: Response) {
		const { restaurantId } = req.params;

		const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

		const categories = await listCategoriesUseCase.execute(restaurantId);

		return res.status(200).json(categories);
	}
}

export { ListCategoriesController };
