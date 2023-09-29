import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class DeleteUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(userId: string) {
		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new AppError("User does not exist.");
		} else {
			await this.usersRepository.delete(userId);
		}
	}
}

export { DeleteUserUseCase };
