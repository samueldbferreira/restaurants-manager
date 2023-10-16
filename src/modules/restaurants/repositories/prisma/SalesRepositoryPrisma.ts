import { prisma } from "../../../../shared/infra/prisma";
import { ICreateSaleDTO } from "../../dtos/ICreateSaleDTO";
import { IUpdateSaleDTO } from "../../dtos/IUpdateSaleDTO";
import { ISale } from "../../entities/ISale";
import { ISalesRepository } from "../ISalesRepository";

class SalesRepositoryPrisma implements ISalesRepository {
	async create(data: ICreateSaleDTO): Promise<ISale> {
		return await prisma.sale.create({
			data,
		});
	}

	async findByTitle(
		title: string,
		restaurantId: string
	): Promise<ISale | null> {
		return await prisma.sale.findFirst({
			where: {
				title,
				restaurantId,
			},
		});
	}

	async findById(id: string): Promise<ISale | null> {
		return await prisma.sale.findUnique({
			where: {
				id,
			},
			include: {
				Product: true,
			},
		});
	}

	async list(restaurantId: string): Promise<ISale[]> {
		return await prisma.sale.findMany({
			where: {
				restaurantId,
			},
		});
	}

	async update(data: IUpdateSaleDTO): Promise<ISale> {
		const updatedSale = await prisma.sale.update({
			where: {
				id: data.saleId,
			},
			data: {
				title: data.title,
				description: data.description,
				discount: data.discount,
			},
		});

		return updatedSale;
	}

	async addProducts(saleId: string, products: string[]): Promise<number> {
		const { count } = await prisma.product.updateMany({
			where: {
				id: {
					in: products,
				},
			},
			data: {
				saleId,
			},
		});

		return count;
	}

	async removeProducts(saleId: string, products: string[]): Promise<number> {
		const { count } = await prisma.product.updateMany({
			where: {
				AND: [
					{
						id: {
							in: products,
						},
					},
					{
						saleId,
					},
				],
			},
			data: {
				saleId: null,
			},
		});

		return count;
	}

	async delete(saleId: string): Promise<void> {
		await prisma.sale.delete({
			where: {
				id: saleId,
			},
		});

		return;
	}
}

export { SalesRepositoryPrisma };
