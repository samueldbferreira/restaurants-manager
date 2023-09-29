import "reflect-metadata";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";

describe("List Categories", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let categoriesRepository: ICategoriesRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let createCategoryUseCase: CreateCategoryUseCase;
	let listCategoriesUseCase: ListCategoriesUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		categoriesRepository = new CategoriesRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepository,
			restaurantsRepository
		);
		listCategoriesUseCase = new ListCategoriesUseCase(
			restaurantsRepository,
			categoriesRepository
		);
	});

	it("should be able to list the categories of a restaurant", async () => {
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
			userId: user.id,
		});

		await createCategoryUseCase.execute({
			name: "Category 1",
			description: "Category 1 description",
			restaurantId: restaurant.id,
		});

		await createCategoryUseCase.execute({
			name: "Category 2",
			description: "Category 2 description",
			restaurantId: restaurant2.id,
		});

		await createCategoryUseCase.execute({
			name: "Category 3",
			description: "Category 3 description",
			restaurantId: restaurant.id,
		});

		const categories = await listCategoriesUseCase.execute(restaurant.id);

		expect(categories.length).toEqual(2);
	});

	it("should not be able to list the categories of a non-existing restaurant", () => {
		expect(async () => {
			await listCategoriesUseCase.execute("invalid id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
