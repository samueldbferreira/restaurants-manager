import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IListProductsDTO } from "../dtos/IListProductsDTO";
import { IProduct } from "../entities/IProduct";

interface IProductsRepository {
	findByName(name: string, restaurantId: string): Promise<IProduct | null>;

	create(data: ICreateProductDTO): Promise<IProduct>;

	list(data: IListProductsDTO): Promise<IProduct[]>;
}

export { IProductsRepository };
