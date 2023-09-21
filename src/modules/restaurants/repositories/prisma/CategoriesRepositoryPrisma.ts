import { prisma } from "../../../../shared/infra/prisma";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategory } from "../../entities/ICategory";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryPrisma implements ICategoriesRepository {
	async findByName(name: string): Promise<ICategory | null> {
		return await prisma.category.findUnique({
			where: {
				name,
			},
		});
	}

	async create(data: ICreateCategoryDTO): Promise<ICategory> {
		return await prisma.category.create({
			data,
		});
	}
}

export { CategoriesRepositoryPrisma };
