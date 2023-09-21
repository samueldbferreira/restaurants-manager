import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { ICategory } from "../entities/ICategory";

interface ICategoriesRepository {
	findByName(name: string): Promise<ICategory | null>;

	create(data: ICreateCategoryDTO): Promise<ICategory>;
}

export { ICategoriesRepository };
