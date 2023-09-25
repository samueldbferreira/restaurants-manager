import { prisma } from "../../../../shared/infra/prisma";
import { ICreateSaleDTO } from "../../dtos/ICreateSaleDTO";
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
}

export { SalesRepositoryPrisma };
