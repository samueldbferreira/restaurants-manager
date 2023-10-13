import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class GetProductUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(userId: string, restaurantId: string, productId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);

		if (!restaurant) {
			throw new AppError("Invalid restaurant id.");
		}

		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.");
		}

		const product = await this.productsRepository.findById(productId);

		if (!product) {
			throw new AppError("Product not found", 404);
		}

		if (product.restaurantId !== restaurantId) {
			throw new AppError("Product does not belong to this restaurant.");
		}

		return product;
	}
}

export { GetProductUseCase };
