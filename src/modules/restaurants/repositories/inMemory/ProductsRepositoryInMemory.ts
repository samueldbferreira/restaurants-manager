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

	list(data: IListProductsDTO): Promise<IProduct[]> {
		throw new Error("Method not implemented.");
	}
}

export { ProductsRepositoryInMemory };
