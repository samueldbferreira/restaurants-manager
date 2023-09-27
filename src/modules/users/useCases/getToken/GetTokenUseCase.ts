import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
	email: string;
	password: string;
}

@injectable()
class GetTokenUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute(data: IRequest) {
		const user = await this.usersRepository.findByEmail(data.email);
		if (!user) {
			throw new AppError("Invalid Email or password.");
		}

		const correctPassword = await compare(data.password, user.password);
		if (!correctPassword) {
			throw new AppError("Invalid Email or password.");
		}

		const token = sign({}, "8d302942f6cd3148f9c0fd07298aea52", {
			expiresIn: "1d",
			subject: user.id,
		});

		return token;
	}
}

export { GetTokenUseCase };
