import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class DeleteSaleUseCase {
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
			throw new AppError("Restaurant does not belong to this user.", 403);
		}

		const sale = await this.salesRepository.findById(saleId);
		if (!sale) {
			throw new AppError("Invalid sale ID.");
		}
		if (sale.restaurantId !== restaurantId) {
			throw new AppError("Sale does not belong to this restaurant.", 403);
		}

		await this.salesRepository.delete(saleId);
	}
}

export { DeleteSaleUseCase };
