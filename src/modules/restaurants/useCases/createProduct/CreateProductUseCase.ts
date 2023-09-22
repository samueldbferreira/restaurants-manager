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
		const restaurantExists = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurantExists) {
			throw new AppError("Invalid restaurant ID.");
		}

		const categoryExists = await this.categoriesRepository.findById(
			data.categoryId
		);
		if (!categoryExists) {
			throw new AppError("Invalid category ID.");
		}

		if (restaurantExists.id !== categoryExists.restaurantId) {
			throw new AppError("Category does not belong to this restaurant");
		}

		const productNameAlreadyExists = await this.productsRepository.findByName(
			data.name,
			data.restaurantId
		);
		if (productNameAlreadyExists) {
			throw new AppError("This product name is already in use.");
		}

		const newProduct = await this.productsRepository.create(data);

		return newProduct;
	}
}

export { CreateProductUseCase };
