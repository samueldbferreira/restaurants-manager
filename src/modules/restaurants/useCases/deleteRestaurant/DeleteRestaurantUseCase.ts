import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class DeleteRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(id: string) {
		const restaurantExists = await this.restaurantsRepository.findById(id);
		if (!restaurantExists) {
			throw new AppError("Restaurant does not exist.");
		} else {
			await this.restaurantsRepository.delete(id);
		}
	}
}

export { DeleteRestaurantUseCase };
