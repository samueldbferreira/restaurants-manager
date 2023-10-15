import { ICreateSaleDTO } from "../../dtos/ICreateSaleDTO";
import { IUpdateSaleDTO } from "../../dtos/IUpdateSaleDTO";
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

	async findById(id: string): Promise<ISale | null> {
		return this.sales.find((s) => s.id === id) || null;
	}

	async list(restaurantId: string): Promise<ISale[]> {
		return this.sales.filter((s) => s.restaurantId === restaurantId) || null;
	}

	async update(data: IUpdateSaleDTO): Promise<ISale> {
		const idx = this.sales.findIndex((s) => s.id == data.saleId);

		const sale = this.sales[idx];

		this.sales[idx] = Object.assign(sale, data);

		return this.sales[idx];
	}
}

export { SalesRepositoryInMemory };
