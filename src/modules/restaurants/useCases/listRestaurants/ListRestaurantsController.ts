import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRestaurantsUseCase } from "./ListRestaurantsUseCase";

class ListRestaurantsController {
	async handle(_: Request, res: Response) {
		const listRestaurantsUseCase = container.resolve(ListRestaurantsUseCase);

		const restaurants = await listRestaurantsUseCase.execute();

		res.status(200).json(restaurants);
	}
}

export { ListRestaurantsController };
