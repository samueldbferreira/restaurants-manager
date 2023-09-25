import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISalesRepository } from "../../repositories/ISalesRepository";

@injectable()
class GetSaleUseCase {
	constructor(
		@inject("SalesRepository")
		private salesRepository: ISalesRepository
	) {}

	async execute(saleId: string) {
		const sale = await this.salesRepository.findById(saleId);
		if (!sale) {
			throw new AppError("Invalid sale ID.");
		} else {
			return sale;
		}
	}
}

export { GetSaleUseCase };
