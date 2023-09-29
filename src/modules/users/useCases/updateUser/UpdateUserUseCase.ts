import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
	id: string;
	name: string;
	email: string;
	password: string;
}

@injectable()
class UpdateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IRequest) {
		const user = await this.usersRepository.findById(data.id);
		if (!user) {
			throw new AppError("User does not exist.");
		}

		if (data.email && data.email !== user.email) {
			const emailInUse = await this.usersRepository.findByEmail(data.email);
			if (emailInUse) {
				throw new AppError("This email is already in use.");
			}
		}

		if (data.password) {
			data.password = await hash(data.password, 8);
		}

		const updatedUser = await this.usersRepository.update(data);

		return updatedUser;
	}
}

export { UpdateUserUseCase };
