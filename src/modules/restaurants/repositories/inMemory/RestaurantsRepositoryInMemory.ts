import "reflect-metadata";
import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IRestaurant } from "../../entities/IRestaurant";
import { Restaurant } from "../../entities/implementations/Restaurant";
import { IRestaurantsRepository } from "../IRestaurantsRepository";
import { IUpdateRestaurantDTO } from "../../dtos/IUpdateRestaurantDTO";

class RestaurantsRepositoryInMemory implements IRestaurantsRepository {
	private restaurants: IRestaurant[];

	constructor() {
		this.restaurants = [];
	}

	async findById(id: string): Promise<IRestaurant | null> {
		return this.restaurants.find((r) => r.id === id) || null;
	}

	async findByName(name: string): Promise<IRestaurant | null> {
		return this.restaurants.find((r) => r.name === name) || null;
	}

	async create(data: ICreateRestaurantDTO): Promise<IRestaurant> {
		const newRestaurant = new Restaurant(data);

		this.restaurants.push(newRestaurant);

		return newRestaurant;
	}

	async listAll(userId: string): Promise<IRestaurant[]> {
		return this.restaurants.filter((r) => r.userId === userId);
	}

	async delete(id: string): Promise<void> {
		this.restaurants = this.restaurants.filter((r) => r.id !== id);

		return;
	}

	async update(data: IUpdateRestaurantDTO): Promise<IRestaurant> {
		const idx = this.restaurants.findIndex((r) => r.id == data.restaurantId);

		const restaurant = this.restaurants[idx];

		this.restaurants[idx] = Object.assign(restaurant, data);

		return this.restaurants[idx];
	}
}

export { RestaurantsRepositoryInMemory };
