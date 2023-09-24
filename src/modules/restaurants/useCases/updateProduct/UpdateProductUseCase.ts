import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	productId: string;
	photo?: string;
	name?: string;
	price?: number;
	categoryId?: string;
	restaurantId: string;
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

		if (data.categoryId) {
			const categoryExists = await this.categoriesRepository.findById(
				data.categoryId
			);

			if (!categoryExists) {
				throw new AppError("Invalid category ID.");
			}

			if (categoryExists.restaurantId !== data.restaurantId) {
				throw new AppError("Category does not belong to this restaurant.");
			}
		}

		const updatedProduct = await this.productsRepository.update(data);

		return updatedProduct;
	}
}

export { UpdateProductUseCase };
