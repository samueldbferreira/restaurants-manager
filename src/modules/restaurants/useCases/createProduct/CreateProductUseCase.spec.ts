import "reflect-metadata";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepositoryInMemory } from "../../../users/repositories/inMemory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { ProductsRepositoryInMemory } from "../../repositories/inMemory/ProductsRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateProductUseCase } from "./CreateProductUseCase";

describe("Create Product", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let productsRepository: IProductsRepository;
	let createProductUseCase: CreateProductUseCase;

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
		productsRepository = new ProductsRepositoryInMemory();
		createProductUseCase = new CreateProductUseCase(
			restaurantsRepository,
			categoriesRepository,
			productsRepository
		);
	});

	it("should be able to create a new product", async () => {
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

		const category = await createCategoryUseCase.execute({
			name: "Category Name",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		const newProduct = await createProductUseCase.execute({
			name: "Product Name",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
		});

		expect(newProduct).toHaveProperty("id");
	});

	it("should not be able to create a new product for a non-existing restaurant", () => {
		expect(async () => {
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

			const category = await createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: restaurant.id,
			});

			await createProductUseCase.execute({
				name: "Product Name",
				price: 24.75,
				categoryId: category.id,
				restaurantId: "invalid id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new product for a non-existing category", () => {
		expect(async () => {
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
			});

			await createProductUseCase.execute({
				name: "Product Name",
				price: 24.75,
				categoryId: "invalid id",
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a new product for a category that does not belong to the restaurant received as a parameter.", () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

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
				userId: user.id,
			});

			const categoryRestaurant1 = await createCategoryUseCase.execute({
				name: "Category of Restaurant 1",
				description: "Category description",
				restaurantId: restaurant1.id,
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

			const categoryRestaurant2 = await createCategoryUseCase.execute({
				name: "Category of Restaurant 2",
				description: "Category description",
				restaurantId: restaurant2.id,
			});

			await createProductUseCase.execute({
				name: "Product Name",
				price: 24.75,
				categoryId: categoryRestaurant1.id,
				restaurantId: restaurant2.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
