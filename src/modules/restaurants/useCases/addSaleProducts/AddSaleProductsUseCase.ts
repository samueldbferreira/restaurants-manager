import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
	userId: string;
	restaurantId: string;
	saleId: string;
	products: string[];
}

@injectable()
class AddSaleProductsUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("SalesRepository")
		private salesRepository: ISalesRepository
	) {}

	async execute(data: IRequest) {
		const restaurant = await this.restaurantsRepository.findById(
			data.restaurantId
		);
		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== data.userId) {
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		const sale = await this.salesRepository.findById(data.saleId);
		if (!sale) {
			throw new AppError("Invalid sale ID.");
		}
		if (sale.restaurantId !== data.restaurantId) {
			throw new AppError("Sale does not belong to this restaurant.", 403);
		}

		const count = await this.salesRepository.addProducts(
			sale.id,
			data.products
		);

		return { count };
	}
}

export { AddSaleProductsUseCase };
