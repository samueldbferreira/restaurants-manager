import { inject, injectable } from "tsyringe";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

@injectable()
class ListRestaurantsUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(userId: string) {
		const restaurants = await this.restaurantsRepository.listAll(userId);

		return restaurants;
	}
}

export { ListRestaurantsUseCase };
