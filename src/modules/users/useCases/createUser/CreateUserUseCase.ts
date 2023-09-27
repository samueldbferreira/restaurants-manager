import { hash } from "bcrypt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IRequest) {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email
		);
		if (userAlreadyExists) {
			throw new AppError("Email already in use.");
		}

		const hashPassword = await hash(data.password, 8);

		const newUser = await this.usersRepository.create({
			name: data.name,
			email: data.email,
			password: hashPassword,
		});

		return newUser;
	}
}

export { CreateUserUseCase };
