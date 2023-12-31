import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import deleteFile from "../../../../utils/deleteFile";

@injectable()
class DeleteRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(userId: string, restaurantId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);
		if (!restaurant) {
			throw new AppError("Restaurant does not exist.");
		}
		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		if (restaurant.photo) {
			deleteFile(`./tmp/restaurants/${restaurant.photo}`);
		}

		await this.restaurantsRepository.delete(restaurantId);
	}
}

export { DeleteRestaurantUseCase };
