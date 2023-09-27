import "reflect-metadata";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { GetTokenUseCase } from "./GetTokenUseCase";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../../shared/errors/AppError";

describe("Get Token", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let getTokenUseCase: GetTokenUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		getTokenUseCase = new GetTokenUseCase(usersRepository);
	});

	it("should be able to get a token for a user", async () => {
		const { id } = await createUserUseCase.execute({
			name: "User",
			email: "user@email.com",
			password: "password",
		});

		const token = await getTokenUseCase.execute({
			email: "user@email.com",
			password: "password",
		});

		const { sub } = verify(token, "8d302942f6cd3148f9c0fd07298aea52");

		expect(sub).toEqual(id);
	});

	it("should not be able to get a token for an invalid email", () => {
		expect(async () => {
			await createUserUseCase.execute({
				name: "User",
				email: "user@email.com",
				password: "password",
			});

			await getTokenUseCase.execute({
				email: "invalid-email",
				password: "password",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to get a token for an incorrect password", () => {
		expect(async () => {
			await createUserUseCase.execute({
				name: "User",
				email: "user@email.com",
				password: "password",
			});

			await getTokenUseCase.execute({
				email: "user@email.com",
				password: "incorrect",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
