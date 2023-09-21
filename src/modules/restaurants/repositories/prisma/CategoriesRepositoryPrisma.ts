import { prisma } from "../../../../shared/infra/prisma";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategory } from "../../entities/ICategory";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryPrisma implements ICategoriesRepository {
	async findByName(
		name: string,
		restaurantId: string
	): Promise<ICategory | null> {
		return await prisma.category.findFirst({
			where: {
				name,
				restaurantId,
			},
		});
	}

	async create(data: ICreateCategoryDTO): Promise<ICategory> {
		return await prisma.category.create({
			data,
		});
	}

	async listByRestaurant(restaurantId: string): Promise<ICategory[]> {
		return await prisma.category.findMany({
			where: {
				restaurantId,
			},
		});
	}
}

export { CategoriesRepositoryPrisma };
