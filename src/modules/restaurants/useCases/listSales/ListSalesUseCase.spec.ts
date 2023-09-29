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

describe("", () => {
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
			title: "Sale 1",
			description: "Sale description",
			discount: 0.15,
			restaurantId: restaurant.id,
		});

		const sale2 = await createSaleUseCase.execute({
			title: "Sale 2",
			description: "Sale description",
			discount: 0.25,
			restaurantId: restaurant.id,
		});

		const sale3 = await createSaleUseCase.execute({
			title: "Sale 3",
			description: "Sale description",
			discount: 0.35,
			restaurantId: restaurant.id,
		});

		const sales = await listSalesUseCase.execute(restaurant.id);

		expect(sales).toMatchObject([sale1, sale2, sale3]);
	});

	it("should be not able to list the sales of a inexistent restaurant", async () => {
		expect(async () => {
			await listSalesUseCase.execute("invalid-id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
