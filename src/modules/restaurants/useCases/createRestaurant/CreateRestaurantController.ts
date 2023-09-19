import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRestaurantUseCase } from "./CreateRestaurantUseCase";

class CreateRestaurantController {
	async handle(req: Request, res: Response) {
		const { name, photo, address, schedule } = req.body;

		const createRestaurantUseCase = container.resolve(CreateRestaurantUseCase);

		const newRestaurant = await createRestaurantUseCase.execute({
			name,
			photo,
			address,
			schedule,
		});

		return res.status(201).json(newRestaurant);
	}
}

export { CreateRestaurantController };
