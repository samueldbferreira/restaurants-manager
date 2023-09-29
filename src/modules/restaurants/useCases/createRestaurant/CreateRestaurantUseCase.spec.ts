import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "./CreateRestaurantUseCase";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";

describe("Create Restaurant", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
	});

	it("should be able to create a new restaurant for a user", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const newRestaurant = await createRestaurantUseCase.execute({
			name: "restaurant name",
			address: "restaurant address",
			schedule: {
				sun: {
					start: "08:00",
					end: "18:00",
				},
				mon: {
					start: "08:00",
					end: "18:00",
				},
				tue: {
					start: "08:00",
					end: "18:00",
				},
				wed: {
					start: "08:00",
					end: "18:00",
				},
				thu: {
					start: "08:00",
					end: "18:00",
				},
				fri: {
					start: "08:00",
					end: "18:00",
				},
				sat: {
					start: "08:00",
					end: "18:00",
				},
			},
			userId: user.id,
		});

		expect(newRestaurant).toHaveProperty("id");
	});

	it("should not be able to create a restaurant with an already existing name", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			await createRestaurantUseCase.execute({
				name: "restaurant name",
				address: "restaurant address",
				schedule: {
					sun: {
						start: "08:00",
						end: "18:00",
					},
					mon: {
						start: "08:00",
						end: "18:00",
					},
					tue: {
						start: "08:00",
						end: "18:00",
					},
					wed: {
						start: "08:00",
						end: "18:00",
					},
					thu: {
						start: "08:00",
						end: "18:00",
					},
					fri: {
						start: "08:00",
						end: "18:00",
					},
					sat: {
						start: "08:00",
						end: "18:00",
					},
				},
				userId: user.id,
			});

			await createRestaurantUseCase.execute({
				name: "restaurant name",
				address: "restaurant address",
				schedule: {
					sun: {
						start: "08:00",
						end: "18:00",
					},
					mon: {
						start: "08:00",
						end: "18:00",
					},
					tue: {
						start: "08:00",
						end: "18:00",
					},
					wed: {
						start: "08:00",
						end: "18:00",
					},
					thu: {
						start: "08:00",
						end: "18:00",
					},
					fri: {
						start: "08:00",
						end: "18:00",
					},
					sat: {
						start: "08:00",
						end: "18:00",
					},
				},
				userId: user.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
