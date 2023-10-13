import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { SalesRepositoryInMemory } from "../../repositories/inMemory/SalesRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateSaleUseCase } from "./CreateSaleUseCase";

describe("Create Sale", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		salesRepository = new SalesRepositoryInMemory();
		createSaleUseCase = new CreateSaleUseCase(
			restaurantsRepository,
			salesRepository
		);
	});

	it("should be able to create a new sale", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const restaurant = await createRestaurantUseCase.execute({
			name: "Restaurant",
			address: "Restaurant",
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

		const sale = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale",
			description: "Sale description",
			discount: 0.15,
		});

		expect(sale).toHaveProperty("id");
	});

	it("should not be able to create a new sale for a non-existing restaurant", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			await createSaleUseCase.execute({
				userId: user.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.15,
				restaurantId: "invalid id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new sale for a restaurant that does not belong to the user", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const user2 = await createUserUseCase.execute({
				name: "User Name",
				email: "user2@email.com",
				password: "password",
			});

			const restaurant = await createRestaurantUseCase.execute({
				name: "Restaurant",
				address: "Restaurant",
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

			await createSaleUseCase.execute({
				userId: user2.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.15,
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new sale with an already in use name for a restaurant", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const user2 = await createUserUseCase.execute({
				name: "User Name",
				email: "user2@email.com",
				password: "password",
			});

			const restaurant = await createRestaurantUseCase.execute({
				name: "Restaurant",
				address: "Restaurant",
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

			await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				title: "Same Title",
				description: "Sale 1 description",
				discount: 0.15,
			});

			await createSaleUseCase.execute({
				userId: user2.id,
				restaurantId: restaurant.id,
				title: "Same Title",
				description: "Sale 2 description",
				discount: 0.25,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
