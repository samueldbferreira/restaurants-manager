import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";

describe("Delete Category", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let deleteCategoryUseCase: DeleteCategoryUseCase;
	let listCategoriesUseCase: ListCategoriesUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		categoriesRepository = new CategoriesRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepository,
			restaurantsRepository
		);
		deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);
		listCategoriesUseCase = new ListCategoriesUseCase(
			restaurantsRepository,
			categoriesRepository
		);
	});

	it("should be able to delete a category", async () => {
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

		const category1 = await createCategoryUseCase.execute({
			name: "Category 1",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		const category2 = await createCategoryUseCase.execute({
			name: "Category 2",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		const category3 = await createCategoryUseCase.execute({
			name: "Category 3",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		await deleteCategoryUseCase.execute(category2.id);

		const categories = await listCategoriesUseCase.execute(restaurant.id);

		expect(categories).toEqual([category1, category3]);
	});

	it("should not be able to delete a non-existing category", () => {
		expect(async () => {
			await deleteCategoryUseCase.execute("non-existing id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
