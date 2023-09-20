import "reflect-metadata";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { GetRestaurantUseCase } from "./GetRestaurantUseCase";
import { AppError } from "../../../../shared/errors/AppError";

describe("Get Restaurant", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let getRestaurantUseCase: GetRestaurantUseCase;

	beforeEach(() => {
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		getRestaurantUseCase = new GetRestaurantUseCase(restaurantsRepository);
	});

	it("should be able to get a restaurant by its id", async () => {
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
		});

		const restaurant = await getRestaurantUseCase.execute(newRestaurant.id);

		expect(restaurant?.id).toEqual(newRestaurant.id);
	});

	it("should not be able to get a restaurant by an non-existing id", () => {
		expect(async () => {
			await getRestaurantUseCase.execute("abdaodaçadhdakl");
		}).rejects.toBeInstanceOf(AppError);
	});
});
