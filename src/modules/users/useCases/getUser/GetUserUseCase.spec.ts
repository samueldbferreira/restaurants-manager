import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetUserUseCase } from "./GetUserUseCase";

describe("Get User", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let getUserUseCase: GetUserUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		getUserUseCase = new GetUserUseCase(usersRepository);
	});

	it("should be able to get a user", async () => {
		const newUser = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const user = await getUserUseCase.execute(newUser.id);

		expect(user.id).toEqual(newUser.id);
	});

	it("should not be able to get a inexistent user", () => {
		expect(async () => {
			await getUserUseCase.execute("invalid-id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
