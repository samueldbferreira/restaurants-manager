import "reflect-metadata";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateSaleUseCase } from "../createSale/CreateSaleUseCase";
import { DeleteSaleUseCase } from "./DeleteSaleUseCase";
import { ListSalesUseCase } from "../listSales/ListSalesUseCase";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { SalesRepositoryInMemory } from "../../repositories/inMemory/SalesRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

describe("Delete Sale", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;
	let deleteSaleUseCase: DeleteSaleUseCase;
	let listSalesUseCase: ListSalesUseCase;

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
		deleteSaleUseCase = new DeleteSaleUseCase(
			restaurantsRepository,
			salesRepository
		);
		listSalesUseCase = new ListSalesUseCase(
			restaurantsRepository,
			salesRepository
		);
	});

	it("should be able to delete a sale", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const restaurant = await createRestaurantUseCase.execute({
			name: "restaurant",
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

		const sale1 = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale 1",
			description: "Sale 1 description",
			discount: 0.15,
		});

		const sale2 = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale 2",
			description: "Sale 2 description",
			discount: 0.25,
		});

		const sale3 = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale 3",
			description: "Sale 3 description",
			discount: 0.35,
		});

		await deleteSaleUseCase.execute(user.id, restaurant.id, sale2.id);

		const sales = await listSalesUseCase.execute(user.id, restaurant.id);

		expect(sales).toEqual([sale1, sale3]);
	});

	it("should not be able to delete a sale of a inexistent restaurant.", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const restaurant = await createRestaurantUseCase.execute({
				name: "restaurant",
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

			const sale = await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.25,
			});

			await deleteSaleUseCase.execute(user.id, "invalid id", sale.id);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a sale of a restaurant that does not belong to the user", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User 1",
				email: "user@email.com",
				password: "password",
			});

			const user2 = await createUserUseCase.execute({
				name: "User 2",
				email: "user2@email.com",
				password: "password",
			});

			const restaurant = await createRestaurantUseCase.execute({
				name: "restaurant",
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

			const sale = await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.25,
			});

			await deleteSaleUseCase.execute(user2.id, restaurant.id, sale.id);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a inexistent sale", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const restaurant = await createRestaurantUseCase.execute({
				name: "restaurant",
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

			await deleteSaleUseCase.execute(
				user.id,
				restaurant.id,
				"invalid sale id"
			);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a sale that does not belong to the restaurant", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const restaurant1 = await createRestaurantUseCase.execute({
				name: "Restaurant 1",
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

			const restaurant2 = await createRestaurantUseCase.execute({
				name: "Restaurant 2",
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

			const sale = await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant1.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.25,
			});

			await deleteSaleUseCase.execute(user.id, restaurant2.id, sale.id);
		}).rejects.toBeInstanceOf(AppError);
	});
});
