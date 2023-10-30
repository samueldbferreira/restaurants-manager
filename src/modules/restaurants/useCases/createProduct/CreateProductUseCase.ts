import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	photo?: string;
	name: string;
	price: number;
	categoryId: string;
	restaurantId: string;
	userId: string;
}

@injectable()
class CreateProductUseCase {
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
			throw new AppError("Restaurant does not belong to the user.", 403);
		}

		const category = await this.categoriesRepository.findById(data.categoryId);
		if (!category) {
			throw new AppError("Invalid category ID.");
		}
		if (restaurant.id !== category.restaurantId) {
			throw new AppError("Category does not belong to this restaurant.", 403);
		}

		const productNameAlreadyExists = await this.productsRepository.findByName(
			data.name,
			data.restaurantId
		);
		if (productNameAlreadyExists) {
			throw new AppError("This product name is already in use.");
		}

		const newProduct = await this.productsRepository.create({
			name: data.name,
			price: data.price,
			photo: data.photo,
			categoryId: data.categoryId,
			restaurantId: data.restaurantId,
		});

		return newProduct;
	}
}

export { CreateProductUseCase };
