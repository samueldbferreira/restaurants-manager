import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { ICategory } from "../entities/ICategory";

interface ICategoriesRepository {
	findByName(name: string, restaurantId: string): Promise<ICategory | null>;

	create(data: ICreateCategoryDTO): Promise<ICategory>;

	listByRestaurant(restaurantId: string): Promise<ICategory[]>;
}

export { ICategoriesRepository };
