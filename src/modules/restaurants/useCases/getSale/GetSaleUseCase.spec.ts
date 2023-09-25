import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { ISalesRepository } from "../../repositories/ISalesRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { SalesRepositoryInMemory } from "../../repositories/inMemory/SalesRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateSaleUseCase } from "../createSale/CreateSaleUseCase";
import { GetSaleUseCase } from "./GetSaleUseCase";

describe("Get Sale", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let salesRepository: ISalesRepository;
	let createSaleUseCase: CreateSaleUseCase;
	let getSaleUseCase: GetSaleUseCase;

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
		getSaleUseCase = new GetSaleUseCase(salesRepository);
	});

	it("should be able to get a sale", async () => {
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

		const getSale = await getSaleUseCase.execute(sale.id);

		expect(getSale.id).toEqual(sale.id);
	});

	it("should not be able to get a inexistent sale", () => {
		expect(async () => {
			await getSaleUseCase.execute("invalid id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
