import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class ListCategoriesUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(userId: string, restaurantId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		const categories = await this.categoriesRepository.listByRestaurant(
			restaurantId
		);

		return categories;
	}
}

export { ListCategoriesUseCase };
