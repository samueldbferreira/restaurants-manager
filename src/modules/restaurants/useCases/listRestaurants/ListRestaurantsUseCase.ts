import { inject, injectable } from "tsyringe";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class ListRestaurantsUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute() {
		const restaurants = await this.restaurantsRepository.listAll();

		return restaurants;
	}
}

export { ListRestaurantsUseCase };
