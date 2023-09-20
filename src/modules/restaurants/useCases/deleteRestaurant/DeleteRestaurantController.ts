import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteRestaurantUseCase } from "./DeleteRestaurantUseCase";

class DeleteRestaurantController {
	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const deleteRestaurantUseCase = container.resolve(DeleteRestaurantUseCase);

		await deleteRestaurantUseCase.execute(id);

		res.status(204).send();
	}
}

export { DeleteRestaurantController };
