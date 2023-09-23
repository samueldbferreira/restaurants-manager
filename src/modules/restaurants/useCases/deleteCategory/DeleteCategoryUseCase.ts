import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class DeleteCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute(categoryId: string) {
		const category = await this.categoriesRepository.findById(categoryId);
		if (!category) {
			throw new AppError("Category does not exist.");
		} else {
			await this.categoriesRepository.delete(category.id);
		}
	}
}

export { DeleteCategoryUseCase };
