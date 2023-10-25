import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;
		const { name, price, categoryId } = req.body;
		const photo = req.file?.filename;

		const createProductUseCase = container.resolve(CreateProductUseCase);

		const newProduct = await createProductUseCase.execute({
			name,
			photo,
			price: Number(price),
			categoryId,
			restaurantId,
			userId,
		});

		return res.status(201).json(newProduct);
	}
}

export { CreateProductController };
