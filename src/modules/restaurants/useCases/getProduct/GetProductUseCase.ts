import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
class GetProductUseCase {
	constructor(
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(productId: string) {
		const product = await this.productsRepository.findById(productId);

		if (product) {
			return product;
		} else {
			throw new AppError("Product not found", 404);
		}
	}
}

export { GetProductUseCase };
