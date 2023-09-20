import "reflect-metadata";
import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IRestaurant } from "../../entities/IRestaurant";
import { Restaurant } from "../../entities/implementations/Restaurant";
import { IRestaurantsRepository } from "../IRestaurantsRepository";

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

	async listAll(): Promise<IRestaurant[]> {
		return this.restaurants;
	}

	async delete(id: string): Promise<void> {
		this.restaurants = this.restaurants.filter((r) => r.id !== id);

		return;
	}
}

export { RestaurantsRepositoryInMemory };
