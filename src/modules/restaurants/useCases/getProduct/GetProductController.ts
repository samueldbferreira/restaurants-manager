import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProductUseCase } from "./GetProductUseCase";

class GetProductController {
	async handle(req: Request, res: Response) {
		const { productId } = req.params;

		const getProductUseCase = container.resolve(GetProductUseCase);

		const product = await getProductUseCase.execute(productId);

		return res.status(200).json(product);
	}
}

export { GetProductController };
