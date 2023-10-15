import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
	userId: string;
	restaurantId: string;
	saleId: string;
	title?: string;
	description?: string;
	discount?: number;
}

@injectable()
class UpdateSaleUseCase {
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
			throw new AppError("Restaurant does not belong to this user");
		}

		const sale = await this.salesRepository.findById(data.saleId);
		if (!sale) {
			throw new AppError("Invalid sale ID.");
		}
		if (sale.restaurantId !== data.restaurantId) {
			throw new AppError("Sale does not belong to this restaurant.");
		}

		if (data.title && data.title !== sale.title) {
			const titleAlreadyExists = await this.salesRepository.findByTitle(
				data.title,
				restaurant.id
			);
			if (titleAlreadyExists) {
				throw new AppError("This sale name is already in use.");
			}
		}

		const updatedSale = await this.salesRepository.update({
			saleId: data.saleId,
			title: data.title,
			description: data.description,
			discount: data.discount,
		});

		return updatedSale;
	}
}

export { UpdateSaleUseCase };
