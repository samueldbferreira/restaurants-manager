import { ICreateRestaurantDTO } from "../dtos/ICreateRestaurantDTO";
import { IUpdateRestaurantDTO } from "../dtos/IUpdateRestaurantDTO";
import { IRestaurant } from "../entities/IRestaurant";

interface IRestaurantsRepository {
	findById(id: string): Promise<IRestaurant | null>;

	findByName(name: string): Promise<IRestaurant | null>;

	create(data: ICreateRestaurantDTO): Promise<IRestaurant>;

	listAll(userId: string): Promise<IRestaurant[]>;

	delete(id: string): Promise<void>;

	update(data: IUpdateRestaurantDTO): Promise<IRestaurant>;
}

export { IRestaurantsRepository };
