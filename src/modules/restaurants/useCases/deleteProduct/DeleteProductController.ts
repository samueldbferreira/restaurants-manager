import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController {
	async handle(req: Request, res: Response) {
		const { productId } = req.params;

		const deleteProductUseCase = container.resolve(DeleteProductUseCase);

		await deleteProductUseCase.execute(productId);

		return res.status(204).send();
	}
}

export { DeleteProductController };
