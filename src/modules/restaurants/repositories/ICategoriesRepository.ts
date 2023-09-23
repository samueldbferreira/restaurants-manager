import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { ICategory } from "../entities/ICategory";

interface ICategoriesRepository {
	findById(id: string): Promise<ICategory | null>;

	findByName(name: string, restaurantId: string): Promise<ICategory | null>;

	create(data: ICreateCategoryDTO): Promise<ICategory>;

	listByRestaurant(restaurantId: string): Promise<ICategory[]>;

	delete(id: string): Promise<void>;
}

export { ICategoriesRepository };
