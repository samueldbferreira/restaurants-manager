import { ICreateSaleDTO } from "../dtos/ICreateSaleDTO";
import { ISale } from "../entities/ISale";

interface ISalesRepository {
	create(data: ICreateSaleDTO): Promise<ISale>;

	findByTitle(title: string, restaurantId: string): Promise<ISale | null>;

	findById(id: string): Promise<ISale | null>;

	list(restaurantId: string): Promise<ISale[]>;
}

export { ISalesRepository };
