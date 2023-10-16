import { ICreateSaleDTO } from "../dtos/ICreateSaleDTO";
import { IUpdateSaleDTO } from "../dtos/IUpdateSaleDTO";
import { ISale } from "../entities/ISale";

interface ISalesRepository {
	create(data: ICreateSaleDTO): Promise<ISale>;

	findByTitle(title: string, restaurantId: string): Promise<ISale | null>;

	findById(id: string): Promise<ISale | null>;

	list(restaurantId: string): Promise<ISale[]>;

	update(data: IUpdateSaleDTO): Promise<ISale>;

	addProducts(saleId: string, products: string[]): Promise<number>;

	removeProducts(saleId: string, products: string[]): Promise<number>;

	delete(saleId: string): Promise<void>;
}

export { ISalesRepository };
