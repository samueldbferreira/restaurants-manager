import "reflect-metadata";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";

describe("Create Category", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let categoriesRepository: ICategoriesRepository;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let createCategoryUseCase: CreateCategoryUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		categoriesRepository = new CategoriesRepositoryInMemory();
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepository,
			restaurantsRepository
		);
	});

	it("should be able to create a new category", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

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
			userId: user.id,
		});

		const newCategory = await createCategoryUseCase.execute({
			name: "Category Name",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		expect(newCategory).toHaveProperty("id");
	});

	it("should not be able to create a category with an already existing name", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

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
			userId: user.id,
		});

		await createCategoryUseCase.execute({
			name: "Category Name",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		await expect(
			createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: restaurant.id,
				userId: user.id,
			})
		).rejects.toEqual(new AppError("This category name is already in use."));
	});

	it("should not be able to create a category for a non-existing restaurant", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		await expect(
			createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: "invalid id",
				userId: user.id,
			})
		).rejects.toEqual(new AppError("Invalid restaurant ID."));
	});

	it("should not be able to create a category for a restaurant that does not belong to the user", async () => {
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
			userId: user2.id,
		});

		await expect(
			createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: restaurant2.id,
				userId: user1.id,
			})
		).rejects.toEqual(new AppError("Restaurant does not belong to his user."));
	});
});
