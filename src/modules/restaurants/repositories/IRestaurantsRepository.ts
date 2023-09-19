import { ICreateRestaurantDTO } from "../dtos/ICreateRestaurantDTO";
import { IRestaurant } from "../entities/IRestaurant";

interface IRestaurantsRepository {
	findByName(name: string): Promise<IRestaurant | null>;

	create(data: ICreateRestaurantDTO): Promise<IRestaurant>;
}

export { IRestaurantsRepository };
