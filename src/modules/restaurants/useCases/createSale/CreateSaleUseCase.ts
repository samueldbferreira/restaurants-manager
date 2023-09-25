import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";

interface IRequest {
	title: string;
	description: string;
	discount: number;
	restaurantId: string;
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

		const titleAlreadyExists = await this.salesRepository.findByTitle(
			data.title,
			data.restaurantId
		);
		if (titleAlreadyExists) {
			throw new AppError("This sale name is already in use.");
		}

		const newSale = await this.salesRepository.create(data);

		return newSale;
	}
}

export { CreateSaleUseCase };
