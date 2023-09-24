import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../../dtos/IListProductsDTO";
import { IUpdateProductDTO } from "../../dtos/IUpdateProductDTO";
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

	async update(data: IUpdateProductDTO): Promise<IProduct> {
		const idx = this.products.findIndex((p) => p.id == data.productId);

		const product = this.products[idx];

		this.products[idx] = Object.assign(product, data);

		return this.products[idx];
	}
}

export { ProductsRepositoryInMemory };
