import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class GetRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(id: string) {
		const restaurant = await this.restaurantsRepository.findById(id);

		if (!restaurant) {
			throw new AppError("Restaurant not found", 404);
		} else {
			return restaurant;
		}
	}
}

export { GetRestaurantUseCase };
