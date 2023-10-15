import "reflect-metadata";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { SalesRepositoryInMemory } from "../../repositories/inMemory/SalesRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateSaleUseCase } from "../createSale/CreateSaleUseCase";
import { GetSaleUseCase } from "../getSale/GetSaleUseCase";
import { UpdateSaleUseCase } from "./UpdateSaleUseCase";
import { AppError } from "../../../../shared/errors/AppError";

describe("Update Sale", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;
	let updateSaleUseCase: UpdateSaleUseCase;
	let getSaleUseCase: GetSaleUseCase;

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
		updateSaleUseCase = new UpdateSaleUseCase(
			restaurantsRepository,
			salesRepository
		);
		getSaleUseCase = new GetSaleUseCase(restaurantsRepository, salesRepository);
	});

	it("should be able to update a sale", async () => {
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
			discount: 0.15,
		});

		const updateData = {
			userId: user.id,
			restaurantId: restaurant.id,
			saleId: sale.id,
			title: "Updated Sale",
			description: "Updated Sale description",
			discount: 0.25,
		};

		await updateSaleUseCase.execute(updateData);

		const updatedSale = await getSaleUseCase.execute(
			user.id,
			restaurant.id,
			sale.id
		);

		expect(updatedSale).toEqual(Object.assign(sale, updateData));
	});

	it("should not be able to update a sale of a invalid restaurant", () => {
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
				discount: 0.15,
			});

			await updateSaleUseCase.execute({
				userId: user.id,
				restaurantId: "invalid restaurant id",
				saleId: sale.id,
				title: "Updated Sale",
				description: "Updated Sale description",
				discount: 0.25,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a sale of a restaurant that does not belong to the user", () => {
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
				discount: 0.15,
			});

			await updateSaleUseCase.execute({
				userId: user2.id,
				restaurantId: restaurant.id,
				saleId: sale.id,
				title: "Updated Sale",
				description: "Updated Sale description",
				discount: 0.25,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a inexistent sale", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User",
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

			await updateSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				saleId: "invalid sale id",
				title: "Updated Sale",
				description: "Updated Sale description",
				discount: 0.25,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a sale that does not belong to the restaurant", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User",
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

			const sale = await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant1.id,
				title: "Sale",
				description: "Sale description",
				discount: 0.15,
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

			await updateSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant2.id,
				saleId: sale.id,
				title: "Updated Sale",
				description: "Updated Sale description",
				discount: 0.25,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a the sales name to a already existing one", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User",
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
				title: "Sale 1 Title",
				description: "Sale description",
				discount: 0.15,
			});

			const sale2 = await createSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				title: "Sale 2 Title",
				description: "Sale description",
				discount: 0.15,
			});

			await updateSaleUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				saleId: sale2.id,
				title: "Sale 1 Title",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
