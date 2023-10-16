import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, categoryId } = req.params;

		const getCategoryUseCase = container.resolve(GetCategoryUseCase);

		const category = await getCategoryUseCase.execute(
			userId,
			restaurantId,
			categoryId
		);

		return res.status(200).json(category);
	}
}

export { GetCategoryController };
