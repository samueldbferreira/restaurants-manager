import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	name: string;
	description: string;
	restaurantId: string;
	userId: string;
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository,
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(data: IRequest) {
		const restaurant = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== data.userId) {
			throw new AppError("Restaurant does not belong to his user.", 403);
		}

		const nameAlreadyExists = await this.categoriesRepository.findByName(
			data.name,
			data.restaurantId
		);
		if (nameAlreadyExists) {
			throw new AppError("This category name is already in use.");
		}

		const newCategory = await this.categoriesRepository.create({
			name: data.name,
			description: data.description,
			restaurantId: data.restaurantId,
		});

		return newCategory;
	}
}

export { CreateCategoryUseCase };
