import { prisma } from "../../../../shared/infra/prisma";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../dtos/IUpdateCategoryDTO";
import { ICategory } from "../../entities/ICategory";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryPrisma implements ICategoriesRepository {
	async findById(id: string): Promise<ICategory | null> {
		return await prisma.category.findUnique({
			where: {
				id,
			},
		});
	}

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

	async delete(id: string): Promise<void> {
		const deleteProducts = prisma.product.deleteMany({
			where: {
				categoryId: id,
			},
		});

		const deleteCategory = prisma.category.delete({
			where: {
				id,
			},
		});

		await prisma.$transaction([deleteProducts, deleteCategory]);

		return;
	}

	async update(data: IUpdateCategoryDTO): Promise<ICategory> {
		const updatedCategory = await prisma.category.update({
			where: {
				id: data.categoryId,
			},
			data: {
				name: data.name,
				description: data.description,
			},
		});

		return updatedCategory;
	}
}

export { CategoriesRepositoryPrisma };
