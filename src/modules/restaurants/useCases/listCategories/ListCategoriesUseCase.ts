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

	async execute(restaurantId: string) {
		const restaurantExists = await this.restaurantsRepository.findById(
			restaurantId
		);
		if (!restaurantExists) {
			throw new AppError("Invalid restaurant ID.");
		}

		const categories = await this.categoriesRepository.listByRestaurant(
			restaurantId
		);

		return categories;
	}
}

export { ListCategoriesUseCase };
