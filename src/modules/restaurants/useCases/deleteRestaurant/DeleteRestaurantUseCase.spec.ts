import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ListRestaurantsUseCase } from "../listRestaurants/ListRestaurantsUseCase";
import { DeleteRestaurantUseCase } from "./DeleteRestaurantUseCase";

describe("Delete Restaurant", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let deleteRestaurantUseCase: DeleteRestaurantUseCase;
	let listRestaurantsUseCase: ListRestaurantsUseCase;

	beforeEach(() => {
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		deleteRestaurantUseCase = new DeleteRestaurantUseCase(
			restaurantsRepository
		);
		listRestaurantsUseCase = new ListRestaurantsUseCase(restaurantsRepository);
	});

	it("should be able to delete a restaurant", async () => {
		const restaurant1 = await createRestaurantUseCase.execute({
			name: "restaurant name 1",
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

		const restaurant2 = await createRestaurantUseCase.execute({
			name: "restaurant name 2",
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

		await deleteRestaurantUseCase.execute(restaurant2.id);

		const restaurants = await listRestaurantsUseCase.execute();

		expect(restaurants.length).toEqual(1);
	});

	it("should not be able to delete a non-existing restaurant", () => {
		expect(async () => {
			await deleteRestaurantUseCase.execute("non-existing id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
