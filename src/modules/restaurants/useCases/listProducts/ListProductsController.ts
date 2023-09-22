import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./ListProductsUseCase";

class ListProductsController {
	async handle(req: Request, res: Response) {
		const { restaurantId } = req.params;
		const { categoryId, name, sort } = req.query;

		const listProductsUseCase = container.resolve(ListProductsUseCase);

		const products = await listProductsUseCase.execute({
			restaurantId,
			categoryId: categoryId as string,
			name: name as string,
			sort: sort as "asc" | "desc",
		});

		res.status(200).json(products);
	}
}

export { ListProductsController };
