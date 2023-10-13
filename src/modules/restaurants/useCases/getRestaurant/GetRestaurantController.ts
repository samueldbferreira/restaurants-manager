import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetRestaurantUseCase } from "./GetRestaurantUseCase";

class GetRestaurantController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;

		const getRestaurantUseCase = container.resolve(GetRestaurantUseCase);

		const restaurant = await getRestaurantUseCase.execute(userId, restaurantId);

		return res.status(200).json(restaurant);
	}
}

export { GetRestaurantController };
