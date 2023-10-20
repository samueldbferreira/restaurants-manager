import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ListRestaurantsUseCase } from "../listRestaurants/ListRestaurantsUseCase";
import { DeleteRestaurantUseCase } from "./DeleteRestaurantUseCase";

describe("Delete Restaurant", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let deleteRestaurantUseCase: DeleteRestaurantUseCase;
	let listRestaurantsUseCase: ListRestaurantsUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
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
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		await createRestaurantUseCase.execute({
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
			userId: user.id,
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
			userId: user.id,
		});

		await deleteRestaurantUseCase.execute(user.id, restaurant2.id);

		const restaurants = await listRestaurantsUseCase.execute(user.id);

		expect(restaurants.length).toEqual(1);
	});

	it("should not be able to delete a non-existing restaurant", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		await expect(
			deleteRestaurantUseCase.execute(user.id, "non-existing id")
		).rejects.toEqual(new AppError("Restaurant does not exist."));
	});

	it("should not be able to delete a restaurant that does not belong to the user", async () => {
		const user1 = await createUserUseCase.execute({
			name: "User 1",
			email: "user1@email.com",
			password: "password",
		});

		const user2 = await createUserUseCase.execute({
			name: "User 2",
			email: "user2@email.com",
			password: "password",
		});

		const restaurantUser2 = await createRestaurantUseCase.execute({
			name: "restaurant user 2",
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
			userId: user2.id,
		});

		await expect(
			deleteRestaurantUseCase.execute(user1.id, restaurantUser2.id)
		).rejects.toEqual(new AppError("Restaurant does not belong to this user."));
	});
});
