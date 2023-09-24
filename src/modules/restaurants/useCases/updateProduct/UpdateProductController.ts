import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
	async handle(req: Request, res: Response) {
		const { restaurantId, productId } = req.params;
		const { photo, name, price, categoryId } = req.body;

		const updateProductUseCase = container.resolve(UpdateProductUseCase);

		const updatedProduct = await updateProductUseCase.execute({
			productId,
			photo,
			name,
			price,
			categoryId,
			restaurantId,
		});

		res.status(200).json(updatedProduct);
	}
}

export { UpdateProductController };
