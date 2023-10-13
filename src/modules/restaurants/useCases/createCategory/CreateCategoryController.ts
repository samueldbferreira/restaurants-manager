import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;
		const { name, description } = req.body;

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

		const newCategory = await createCategoryUseCase.execute({
			name,
			description,
			restaurantId,
			userId,
		});

		return res.status(201).json(newCategory);
	}
}

export { CreateCategoryController };
