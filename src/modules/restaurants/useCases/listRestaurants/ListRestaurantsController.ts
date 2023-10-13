import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRestaurantsUseCase } from "./ListRestaurantsUseCase";

class ListRestaurantsController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;

		const listRestaurantsUseCase = container.resolve(ListRestaurantsUseCase);

		const restaurants = await listRestaurantsUseCase.execute(userId);

		res.status(200).json(restaurants);
	}
}

export { ListRestaurantsController };
