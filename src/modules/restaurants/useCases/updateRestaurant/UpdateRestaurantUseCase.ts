import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISchedule } from "../../entities/ISchedule";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import deleteFile from "../../../../utils/deleteFile";

interface IRequest {
	userId: string;
	restaurantId: string;
	photo?: string;
	name?: string;
	address?: string;
	schedule?: ISchedule;
}

@injectable()
class UpdateRestaurantUseCase {
	constructor(
		@inject("RestaurantsRepository")
		private restaurantsRepository: IRestaurantsRepository
	) {}

	async execute(data: IRequest) {
		const restaurant = await this.restaurantsRepository.findById(
			data.restaurantId
		);

		if (!restaurant) {
			throw new AppError("Invalid restaurant ID.");
		}
		if (restaurant.userId !== data.userId) {
			throw new AppError("Restaurant does not belong to this user.");
		}

		if (data.name && data.name !== restaurant.name) {
			const nameAlreadyExists = await this.restaurantsRepository.findByName(
				data.name
			);
			if (nameAlreadyExists) {
				throw new AppError("This restaurant name is already in use.");
			}
		}

		if (data.photo) {
			deleteFile(`./tmp/restaurants/${restaurant.photo}`);
		}

		const updatedRestaurant = await this.restaurantsRepository.update(data);

		return updatedRestaurant;
	}
}

export { UpdateRestaurantUseCase };
