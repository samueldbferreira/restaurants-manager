import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	name: string;
	description: string;
	restaurantId: string;
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
		const nameAlreadyExists = await this.categoriesRepository.findByName(
			data.name
		);
		if (nameAlreadyExists) {
			throw new AppError("This category name is already in use.");
		}

		const restaurantExists = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurantExists) {
			throw new AppError("Invalid restaurant ID.");
		}

		const newCategory = await this.categoriesRepository.create(data);

		return newCategory;
	}
}

export { CreateCategoryUseCase };
