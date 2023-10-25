import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId, productId } = req.params;
		const { name, price, categoryId } = req.body;
		const photo = req.file?.filename;

		const updateProductUseCase = container.resolve(UpdateProductUseCase);

		const updatedProduct = await updateProductUseCase.execute({
			userId,
			restaurantId,
			productId,
			photo,
			name,
			price,
			categoryId,
		});

		res.status(200).json(updatedProduct);
	}
}

export { UpdateProductController };
