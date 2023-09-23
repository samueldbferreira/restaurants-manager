import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../../dtos/IListProductsDTO";
import { IProduct } from "../../entities/IProduct";
import { Product } from "../../entities/implementations/Product";
import { IProductsRepository } from "../IProductsRepository";

class ProductsRepositoryInMemory implements IProductsRepository {
	private products: IProduct[];

	constructor() {
		this.products = [];
	}

	async findById(id: string): Promise<IProduct | null> {
		return this.products.find((p) => p.id === id) || null;
	}

	async findByName(
		name: string,
		restaurantId: string
	): Promise<IProduct | null> {
		return (
			this.products.find(
				(p) => p.name === name && p.restaurantId === restaurantId
			) || null
		);
	}

	async create(data: ICreateProductDTO): Promise<IProduct> {
		const newProduct = new Product(data);

		this.products.push(newProduct);

		return newProduct;
	}

	async list(data: IListProductsDTO): Promise<IProduct[]> {
		return this.products.filter((p) => p.restaurantId === data.restaurantId);
	}

	async delete(productId: string): Promise<void> {
		this.products = this.products.filter((p) => p.id !== productId);

		return;
	}
}

export { ProductsRepositoryInMemory };
