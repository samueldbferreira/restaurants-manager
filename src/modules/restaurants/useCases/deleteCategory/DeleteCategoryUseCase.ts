import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class DeleteCategoryUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(userId: string, restaurantId: string, categoryId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.");
		}

		const category = await this.categoriesRepository.findById(categoryId);

		if (!category) {
			throw new AppError("Category does not exist.");
		}

		if (category.restaurantId !== restaurantId) {
			throw new AppError("Category does not belong to this restaurant.");
		}

		await this.categoriesRepository.delete(category.id);
	}
}

export { DeleteCategoryUseCase };
