import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../dtos/IListProductsDTO";
import { IProduct } from "../entities/IProduct";

interface IProductsRepository {
	findById(id: string): Promise<IProduct | null>;

	findByName(name: string, restaurantId: string): Promise<IProduct | null>;

	create(data: ICreateProductDTO): Promise<IProduct>;

	list(data: IListProductsDTO): Promise<IProduct[]>;

	delete(productId: string): Promise<void>;
}

export { IProductsRepository };
