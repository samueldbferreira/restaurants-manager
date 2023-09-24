import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateRestaurantUseCase } from "./UpdateRestaurantUseCase";

class UpdateRestaurantController {
	async handle(req: Request, res: Response) {
		const { restaurantId } = req.params;
		const { photo, name, address, schedule } = req.body;

		const updateRestaurantUseCase = container.resolve(UpdateRestaurantUseCase);

		const updatedRestaurant = await updateRestaurantUseCase.execute({
			restaurantId,
			photo,
			name,
			address,
			schedule,
		});

		return res.status(200).json(updatedRestaurant);
	}
}

export { UpdateRestaurantController };
