import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
	userId: string;
	restaurantId: string;
	title: string;
	description: string;
	discount: number;
}

@injectable()
class CreateSaleUseCase {
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
			throw new AppError("Restaurant does not belong to the user.");
		}

		const titleAlreadyExists = await this.salesRepository.findByTitle(
			data.title,
			data.restaurantId
		);

		if (titleAlreadyExists) {
			throw new AppError("This sale name is already in use.");
		}

		const newSale = await this.salesRepository.create({
			title: data.title,
			description: data.description,
			discount: data.discount,
			restaurantId: data.restaurantId,
		});

		return newSale;
	}
}

export { CreateSaleUseCase };
