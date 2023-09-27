import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUser } from "../../entities/IUser";
import { User } from "../../entities/implementations/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
	private users: IUser[];

	constructor() {
		this.users = [];
	}

	async create(data: ICreateUserDTO): Promise<IUser> {
		const newUser = new User(data);

		this.users.push(newUser);

		return newUser;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return this.users.find((u) => u.email === email) || null;
	}
}

export { UsersRepositoryInMemory };
