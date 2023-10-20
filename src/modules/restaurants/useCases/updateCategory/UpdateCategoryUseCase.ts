import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	userId: string;
	restaurantId: string;
	categoryId: string;
	name?: string;
	description?: string;
}

@injectable()
class UpdateCategoryUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(data: IRequest) {
		const restaurant = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== data.userId) {
			throw new AppError("Restaurant does not belong to this user.");
		}

		const category = await this.categoriesRepository.findById(data.categoryId);
		if (!category) {
			throw new AppError("Invalid category ID.");
		}
		if (restaurant.id !== category.restaurantId) {
			throw new AppError("Category does not belong to this restaurant.");
		}

		if (data.name && data.name !== category.name) {
			const nameAlreadyExists = await this.categoriesRepository.findByName(
				data.name,
				restaurant.id
			);
			if (nameAlreadyExists) {
				throw new AppError("This category name is already in use.");
			}
		}

		const updatedCategory = await this.categoriesRepository.update(data);

		return updatedCategory;
	}
}

export { UpdateCategoryUseCase };
