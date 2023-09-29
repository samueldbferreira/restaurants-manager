import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetUserUseCase } from "../getUser/GetUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

describe("Update User", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let updateUserUseCase: UpdateUserUseCase;
	let getUserUseCase: GetUserUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		updateUserUseCase = new UpdateUserUseCase(usersRepository);
		getUserUseCase = new GetUserUseCase(usersRepository);
	});

	it("should be able to update a user", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const updateData = {
			id: user.id,
			name: "New User Name",
			email: "newemail@email.com",
			password: "password",
		};

		await updateUserUseCase.execute(updateData);

		const updatedUser = await getUserUseCase.execute(user.id);

		expect(updatedUser).toEqual(Object.assign(user, updateData));
	});

	it("should not be able to update a inexistent user", () => {
		expect(async () => {
			const updateData = {
				id: "invalid-id",
				name: "New User Name",
				email: "newemail@email.com",
				password: "password",
			};

			await updateUserUseCase.execute(updateData);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a user email to a already in use one", () => {
		expect(async () => {
			const user1 = await createUserUseCase.execute({
				name: "User 1",
				email: "user1@email.com",
				password: "password",
			});

			await createUserUseCase.execute({
				name: "User 2",
				email: "user2@email.com",
				password: "password",
			});

			await updateUserUseCase.execute({
				id: user1.id,
				name: "New User Name",
				email: "user2@email.com",
				password: "password",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
