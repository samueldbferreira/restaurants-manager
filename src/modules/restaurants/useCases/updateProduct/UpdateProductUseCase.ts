import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	userId: string;
	restaurantId: string;
	productId: string;
	photo?: string;
	name?: string;
	price?: number;
	categoryId?: string;
}

@injectable()
class UpdateProductUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository,
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(data: IRequest) {
		const restaurant = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== data.userId) {
			throw new AppError("Restaurant does not belong to the user.");
		}

		const product = await this.productsRepository.findById(data.productId);
		if (!product) {
			throw new AppError("Invalid product ID.");
		}
		if (product.restaurantId !== restaurant.id) {
			throw new AppError("Product does not belong to this restaurant.");
		}

		if (data.name && data.name !== product.name) {
			const nameAlreadyExists = await this.productsRepository.findByName(
				data.name,
				data.restaurantId
			);
			if (nameAlreadyExists) {
				throw new AppError("This product name is already in use.");
			}
		}

		if (data.categoryId && data.categoryId !== product.categoryId) {
			const category = await this.categoriesRepository.findById(
				data.categoryId
			);
			if (!category) {
				throw new AppError("Invalid category ID.");
			}
			if (category.restaurantId !== data.restaurantId) {
				throw new AppError("Category does not belong to this restaurant.");
			}
		}

		const updatedProduct = await this.productsRepository.update(data);

		return updatedProduct;
	}
}

export { UpdateProductUseCase };
