import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISchedule } from "../../entities/ISchedule";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";

interface IRequest {
	name: string;
	photo?: string;
	address: string;
	schedule: ISchedule;
}

@injectable()
class CreateRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(data: IRequest) {
		const nameAlreadyExists = await this.restaurantsRepository.findByName(
			data.name
		);
		if (nameAlreadyExists) {
			throw new AppError("This restaurant name is already in use.");
		}

		const newRestaurant = await this.restaurantsRepository.create(data);

		return newRestaurant;
	}
}

export { CreateRestaurantUseCase };
