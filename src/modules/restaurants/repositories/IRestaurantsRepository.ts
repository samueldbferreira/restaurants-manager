import { ICreateRestaurantDTO } from "../dtos/ICreateRestaurantDTO";
import { IRestaurant } from "../entities/IRestaurant";

interface IRestaurantsRepository {
	findById(id: string): Promise<IRestaurant | null>;

	findByName(name: string): Promise<IRestaurant | null>;

	create(data: ICreateRestaurantDTO): Promise<IRestaurant>;

	listAll(): Promise<IRestaurant[]>;

	delete(id: string): Promise<void>;
}

export { IRestaurantsRepository };
