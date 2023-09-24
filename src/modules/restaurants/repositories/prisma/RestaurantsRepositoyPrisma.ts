import { prisma } from "../../../../shared/infra/prisma";
import { ICreateRestaurantDTO } from "../../dtos/ICreateRestaurantDTO";
import { IUpdateRestaurantDTO } from "../../dtos/IUpdateRestaurantDTO";
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
		const deleteProducts = prisma.product.deleteMany({
			where: {
				restaurantId: id,
			},
		});

		const deleteCategories = prisma.category.deleteMany({
			where: {
				restaurantId: id,
			},
		});

		const deleteRestaurant = prisma.restaurant.delete({
			where: {
				id,
			},
		});

		await prisma.$transaction([
			deleteProducts,
			deleteCategories,
			deleteRestaurant,
		]);

		return;
	}

	async update(data: IUpdateRestaurantDTO): Promise<IRestaurant> {
		const updatedRestaurant = await prisma.restaurant.update({
			where: {
				id: data.restaurantId,
			},
			data: {
				photo: data.photo,
				name: data.name,
				address: data.address,
				schedule: data.schedule,
			},
		});

		return updatedRestaurant;
	}
}

export { RestaurantsRepositoryPrisma };
