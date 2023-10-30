import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import deleteFile from "../../../../utils/deleteFile";

@injectable()
class DeleteProductUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(userId: string, restaurantId: string, productId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		const product = await this.productsRepository.findById(productId);
		if (!product) {
			throw new AppError("Product does not exist.", 404);
		}
		if (product.restaurantId !== restaurantId) {
			throw new AppError("Product does not belong to this restaurant.", 403);
		}

		if (product.photo) {
			deleteFile(`./tmp/products/${product.photo}`);
		}

		await this.productsRepository.delete(productId);
	}
}

export { DeleteProductUseCase };
