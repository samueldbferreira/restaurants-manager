import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	restaurantId: string;
	categoryId?: string;
	name?: string;
	sort?: "asc" | "desc";
	min?: number;
	max?: number;
}

@injectable()
class ListProductsUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(data: IRequest) {
		const restaurantExists = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurantExists) {
			throw new AppError("Invalid restaurant ID.");
		}

		const products = await this.productsRepository.list(data);

		return products;
	}
}

export { ListProductsUseCase };
