import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
	});

	it("should be able to create a new user.", async () => {
		const newUser = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		expect(newUser).toHaveProperty("id");
	});

	it("should not be able to create a new user with an already existing email.", async () => {
		await createUserUseCase.execute({
			name: "User 1",
			email: "user@email.com",
			password: "password1",
		});

		await expect(
			createUserUseCase.execute({
				name: "User 2",
				email: "user@email.com",
				password: "password2",
			})
		).rejects.toEqual(new AppError("Email already in use."));
	});
});
