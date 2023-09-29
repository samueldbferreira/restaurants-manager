import { prisma } from "../../../../shared/infra/prisma";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
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

	async findById(id: string): Promise<IUser | null> {
		return this.users.find((u) => u.id === id) || null;
	}

	async delete(id: string): Promise<void> {
		this.users = this.users.filter((u) => u.id !== id);

		return;
	}

	async update(data: IUpdateUserDTO): Promise<IUser> {
		const idx = this.users.findIndex((u) => u.id === data.id);

		const user = this.users[idx];

		this.users[idx] = Object.assign(user, data);

		return this.users[idx];
	}
}

export { UsersRepositoryInMemory };
