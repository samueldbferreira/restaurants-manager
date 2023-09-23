import { prisma } from "../../../../shared/infra/prisma";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../../dtos/IListProductsDTO";
import { IProduct } from "../../entities/IProduct";
import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryPrisma implements IProductsRepository {
	async findById(id: string): Promise<IProduct | null> {
		return await prisma.product.findUnique({
			where: {
				id,
			},
		});
	}

	async findByName(
		name: string,
		restaurantId: string
	): Promise<IProduct | null> {
		return await prisma.product.findFirst({
			where: {
				name,
				restaurantId,
			},
		});
	}

	async create(data: ICreateProductDTO): Promise<IProduct> {
		return await prisma.product.create({
			data,
		});
	}

	async list(data: IListProductsDTO): Promise<IProduct[]> {
		return await prisma.product.findMany({
			where: {
				AND: [
					{
						restaurantId: data.restaurantId,
					},
					{
						categoryId: data.categoryId,
					},
					{
						name: {
							contains: data.name,
						},
					},
				],
			},
			orderBy: {
				price: data.sort,
			},
		});
	}

	async delete(productId: string): Promise<void> {
		await prisma.product.delete({
			where: {
				id: productId,
			},
		});

		return;
	}
}

export { ProductsRepositoryPrisma };
