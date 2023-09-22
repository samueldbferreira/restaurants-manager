import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IProduct } from "../entities/IProduct";

interface IProductsRepository {
	findByName(name: string, restaurantId: string): Promise<IProduct | null>;

	create(data: ICreateProductDTO): Promise<IProduct>;
}

export { IProductsRepository };
