import { prisma } from "../../../../shared/infra/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUser } from "../../entities/IUser";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryPrisma implements IUsersRepository {
	async create(data: ICreateUserDTO): Promise<IUser> {
		const newUser = await prisma.user.create({
			data,
		});

		return newUser;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}

export { UsersRepositoryPrisma };
