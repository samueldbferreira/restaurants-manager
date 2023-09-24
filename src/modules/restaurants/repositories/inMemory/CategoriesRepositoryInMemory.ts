import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { IUpdateCategoryDTO } from "../../dtos/IUpdateCategoryDTO";
import { ICategory } from "../../entities/ICategory";
import { Category } from "../../entities/implementations/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
	private categories: ICategory[];

	constructor() {
		this.categories = [];
	}

	async findById(id: string): Promise<ICategory | null> {
		return this.categories.find((c) => c.id === id) || null;
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

	async delete(id: string): Promise<void> {
		this.categories = this.categories.filter((c) => c.id !== id);

		return;
	}

	async update(data: IUpdateCategoryDTO): Promise<ICategory> {
		const idx = this.categories.findIndex((c) => c.id == data.categoryId);

		const category = this.categories[idx];

		this.categories[idx] = Object.assign(category, data);

		return this.categories[idx];
	}
}

export { CategoriesRepositoryInMemory };
