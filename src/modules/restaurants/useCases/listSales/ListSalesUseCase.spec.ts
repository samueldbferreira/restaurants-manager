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
import { CreateSaleUseCase } from "../createSale/CreateSaleUseCase";
import { ListSalesUseCase } from "./ListSalesUseCase";

describe("List Sales", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;
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
		listSalesUseCase = new ListSalesUseCase(
			restaurantsRepository,
			salesRepository
		);
	});

	it("should be able to list the sales of a restaurant", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const restaurant = await createRestaurantUseCase.execute({
			name: "Restaurant",
			address: "Restaurant address",
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
			description: "Sale description",
			discount: 0.15,
		});

		const sale2 = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale 2",
			description: "Sale description",
			discount: 0.25,
		});

		const sale3 = await createSaleUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
			title: "Sale 3",
			description: "Sale description",
			discount: 0.35,
		});

		const sales = await listSalesUseCase.execute(user.id, restaurant.id);

		expect(sales).toMatchObject([sale1, sale2, sale3]);
	});

	it("should be not able to list the sales of a inexistent restaurant", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		await expect(
			listSalesUseCase.execute(user.id, "invalid restaurant id")
		).rejects.toEqual(new AppError("Invalid restaurant ID."));
	});

	it("should be not able to list the sales of a restaurant that does not belong to the user.", async () => {
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
			address: "Restaurant address",
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

		await expect(
			listSalesUseCase.execute(user2.id, restaurant.id)
		).rejects.toEqual(new AppError("Restaurant does not belong to the user."));
	});
});
