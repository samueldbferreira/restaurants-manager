import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class DeleteProductUseCase {
	constructor(
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(productId: string) {
		const productExists = await this.productsRepository.findById(productId);

		if (!productExists) {
			throw new AppError("Product does not exist.", 404);
		} else {
			await this.productsRepository.delete(productId);
		}
	}
}

export { DeleteProductUseCase };
