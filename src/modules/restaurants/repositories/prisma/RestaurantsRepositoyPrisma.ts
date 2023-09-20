import { prisma } from "../../../../shared/infra/prisma";
import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IRestaurant } from "../../entities/IRestaurant";
import { IRestaurantsRepository } from "../IRestaurantsRepository";

class RestaurantsRepositoryPrisma implements IRestaurantsRepository {
	async findById(id: string): Promise<IRestaurant | null> {
		return await prisma.restaurant.findUnique({
			where: {
				id,
			},
		});
	}

	async findByName(name: string): Promise<IRestaurant | null> {
		return await prisma.restaurant.findUnique({
			where: {
				name,
			},
		});
	}

	async create(data: ICreateRestaurantDTO): Promise<IRestaurant> {
		return await prisma.restaurant.create({
			data,
		});
	}

	async listAll(): Promise<IRestaurant[]> {
		return await prisma.restaurant.findMany();
	}

	async delete(id: string): Promise<void> {
		await prisma.restaurant.delete({
			where: {
				id,
			},
		});

		return;
	}
}

export { RestaurantsRepositoryPrisma };
