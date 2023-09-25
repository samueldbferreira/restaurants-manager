import { ICreateSaleDTO } from "../../dtos/ICreateSaleDTO";
import { ISale } from "../../entities/ISale";
import { Sale } from "../../entities/implementations/Sale";
import { ISalesRepository } from "../ISalesRepository";

class SalesRepositoryInMemory implements ISalesRepository {
	sales: ISale[];

	constructor() {
		this.sales = [];
	}

	async create(data: ICreateSaleDTO): Promise<ISale> {
		const newSale = new Sale(data);

		this.sales.push(newSale);

		return newSale;
	}

	async findByTitle(title: string): Promise<ISale | null> {
		return this.sales.find((s) => s.title === title) || null;
	}
}

export { SalesRepositoryInMemory };
