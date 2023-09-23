import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
	async handle(req: Request, res: Response) {
		const { categoryId } = req.params;

		const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

		await deleteCategoryUseCase.execute(categoryId);

		res.status(204).send();
	}
}

export { DeleteCategoryController };
