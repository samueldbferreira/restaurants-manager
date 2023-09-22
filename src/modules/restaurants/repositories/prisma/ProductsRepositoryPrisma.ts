import { prisma } from "../../../../shared/infra/prisma";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IProduct } from "../../entities/IProduct";
import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryPrisma implements IProductsRepository {
	async findByName(name: string, restaurantId: string): Promise<IProduct | null> {
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
}

export { ProductsRepositoryPrisma };