import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategory } from "../../entities/ICategory";
import { Category } from "../../entities/implementations/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	private categories: ICategory[];

	constructor() {
		this.categories = [];
	}

	async findByName(
		name: string,
		restaurantId: string
	): Promise<ICategory | null> {
		return (
			this.categories.find(
				(c) => c.name === name && c.restaurantId === restaurantId
			) || null
		);
	}

	async create(data: ICreateCategoryDTO): Promise<ICategory> {
		const newCategory = new Category(data);

		this.categories.push(newCategory);

		return newCategory;
	}

	async listByRestaurant(restaurantId: string): Promise<ICategory[]> {
		return this.categories.filter((c) => c.restaurantId === restaurantId);
	}
}

export { CategoriesRepositoryInMemory };
