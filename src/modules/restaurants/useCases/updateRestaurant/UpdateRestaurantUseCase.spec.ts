import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { GetRestaurantUseCase } from "../getRestaurant/GetRestaurantUseCase";
import { UpdateRestaurantUseCase } from "./UpdateRestaurantUseCase";

describe("Update Restaurant", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let updateRestaurantUseCase: UpdateRestaurantUseCase;
	let getRestaurantUseCase: GetRestaurantUseCase;

	beforeEach(() => {
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		updateRestaurantUseCase = new UpdateRestaurantUseCase(
			restaurantsRepository
		);
		getRestaurantUseCase = new GetRestaurantUseCase(restaurantsRepository);
	});

	it("should be able to update a restaurant", async () => {
		const restaurant = await createRestaurantUseCase.execute({
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

		const updateData = {
			restaurantId: restaurant.id,
			name: "New name",
			address: "New address",
			schedule: {
				sun: {
					start: "10:00",
					end: "18:00",
				},
				mon: {
					start: "10:00",
					end: "18:00",
				},
				tue: {
					start: "10:00",
					end: "18:00",
				},
				wed: {
					start: "10:00",
					end: "18:00",
				},
				thu: {
					start: "10:00",
					end: "18:00",
				},
				fri: {
					start: "10:00",
					end: "18:00",
				},
				sat: {
					start: "10:00",
					end: "18:00",
				},
			},
		};

		await updateRestaurantUseCase.execute(updateData);

		const updatedRestaurant = await getRestaurantUseCase.execute(restaurant.id);

		expect(updatedRestaurant).toEqual(Object.assign(restaurant, updateData));
	});

	it("should not be able to update a non-existing restaurant", () => {
		expect(async () => {
			await updateRestaurantUseCase.execute({
				restaurantId: "invalid-id",
				name: "New name",
				address: "New address",
				schedule: {
					sun: {
						start: "10:00",
						end: "18:00",
					},
					mon: {
						start: "10:00",
						end: "18:00",
					},
					tue: {
						start: "10:00",
						end: "18:00",
					},
					wed: {
						start: "10:00",
						end: "18:00",
					},
					thu: {
						start: "10:00",
						end: "18:00",
					},
					fri: {
						start: "10:00",
						end: "18:00",
					},
					sat: {
						start: "10:00",
						end: "18:00",
					},
				},
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a restaurant name to an already in use one", () => {
		expect(async () => {
			const restaurant1 = await createRestaurantUseCase.execute({
				name: "restaurant 1",
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
				name: "restaurant 2",
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

			await updateRestaurantUseCase.execute({
				restaurantId: restaurant2.id,
				name: "restaurant 1",
				address: "New address",
				schedule: {
					sun: {
						start: "10:00",
						end: "18:00",
					},
					mon: {
						start: "10:00",
						end: "18:00",
					},
					tue: {
						start: "10:00",
						end: "18:00",
					},
					wed: {
						start: "10:00",
						end: "18:00",
					},
					thu: {
						start: "10:00",
						end: "18:00",
					},
					fri: {
						start: "10:00",
						end: "18:00",
					},
					sat: {
						start: "10:00",
						end: "18:00",
					},
				},
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});