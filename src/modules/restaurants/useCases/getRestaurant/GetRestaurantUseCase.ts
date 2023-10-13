import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class GetRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(userId: string, restaurantId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);

		if (!restaurant) {
			throw new AppError("Restaurant not found.", 404);
		}

		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		return restaurant;
	}
}

export { GetRestaurantUseCase };
