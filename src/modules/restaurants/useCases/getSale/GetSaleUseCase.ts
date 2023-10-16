import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class GetSaleUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository,
		@inject("SalesRepository")
		private salesRepository: ISalesRepository
	) {}

	async execute(userId: string, restaurantId: string, saleId: string) {
		const restaurant = await this.restaurantsRepository.findById(restaurantId);

		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}

		if (restaurant.userId !== userId) {
			throw new AppError("Restaurant does not belong to this user.");
		}

		const sale = await this.salesRepository.findById(saleId);

		if (!sale) {
			throw new AppError("Invalid sale ID.");
		}

		if (sale.restaurantId !== restaurantId) {
			throw new AppError("Sale does not belong to this restaurant.");
		}

		return Object.assign({
			id: sale.id,
			title: sale.title,
			description: sale.description,
			discount: sale.discount,
			restaurantId: sale.restaurantId,
			createdAt: sale.createdAt,
			products: sale.Product,
		});
	}
}

export { GetSaleUseCase };
