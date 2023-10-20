import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetUserUseCase } from "../getUser/GetUserUseCase";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

describe("Delete User", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let deleteUserUseCase: DeleteUserUseCase;
	let getUserUseCase: GetUserUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		deleteUserUseCase = new DeleteUserUseCase(usersRepository);
		getUserUseCase = new GetUserUseCase(usersRepository);
	});

	it("should be able to delete a user", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		await deleteUserUseCase.execute(user.id);

		await expect(getUserUseCase.execute(user.id)).rejects.toEqual(
			new AppError("User not found.", 404)
		);
	});

	it("should not be able to delete a inexistent user", async () => {
		await expect(deleteUserUseCase.execute("invalid user id")).rejects.toEqual(
			new AppError("User does not exist.")
		);
	});
});
