import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
	async handle(req: Request, res: Response) {
		const { restaurantId, categoryId } = req.params;
		const { name, description } = req.body;

		const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);

		const updatedCategory = await updateCategoryUseCase.execute({
			categoryId,
			name,
			description,
			restaurantId,
		});

		return res.status(200).json(updatedCategory);
	}
}

export { UpdateCategoryController };
