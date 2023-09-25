import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { SalesRepositoryInMemory } from "../../repositories/inMemory/SalesRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateSaleUseCase } from "./CreateSaleUseCase";

describe("Create Sale", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;

	beforeEach(() => {
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
		});

		const sale = await createSaleUseCase.execute({
			title: "Sale",
			description: "Sale description",
			discount: 0.15,
			restaurantId: restaurant.id,
		});

		expect(sale).toHaveProperty("id");
	});

	it("should not be able to create a new sale for a non-existing restaurant", () => {
		expect(async () => {
			await createSaleUseCase.execute({
				title: "Sale",
				description: "Sale description",
				discount: 0.15,
				restaurantId: "invalid id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new sale with an already in use name for a restaurant", () => {
		expect(async () => {
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
			});

			await createSaleUseCase.execute({
				title: "Same Title",
				description: "Sale 1 description",
				discount: 0.15,
				restaurantId: restaurant.id,
			});

			await createSaleUseCase.execute({
				title: "Same Title",
				description: "Sale 2 description",
				discount: 0.25,
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
