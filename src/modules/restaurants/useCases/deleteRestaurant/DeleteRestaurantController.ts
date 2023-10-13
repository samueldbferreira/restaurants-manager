import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRestaurantUseCase } from "./DeleteRestaurantUseCase";

class DeleteRestaurantController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { restaurantId } = req.params;

		const deleteRestaurantUseCase = container.resolve(DeleteRestaurantUseCase);

		await deleteRestaurantUseCase.execute(userId, restaurantId);

		res.status(204).send();
	}
}

export { DeleteRestaurantController };
