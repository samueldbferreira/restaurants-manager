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
import { CreateProductUseCase } from "../createProduct/CreateProductUseCase";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { GetProductUseCase } from "../getProduct/GetProductUseCase";
import { UpdateProductUseCase } from "./UpdateProductUseCase";

describe("Update Product", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let productsRepository: IProductsRepository;
	let createProductUseCase: CreateProductUseCase;
	let updateProductUseCase: UpdateProductUseCase;
	let getProductUseCase: GetProductUseCase;

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
		categoriesRepository = new CategoriesRepositoryInMemory();
		updateProductUseCase = new UpdateProductUseCase(
			restaurantsRepository,
			categoriesRepository,
			productsRepository
		);
		getProductUseCase = new GetProductUseCase(
			restaurantsRepository,
			productsRepository
		);
	});

	it("should be able to update a product", async () => {
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

		const category = await createCategoryUseCase.execute({
			name: "Category",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product = await createProductUseCase.execute({
			name: "Product",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const updateData = {
			userId: user.id,
			restaurantId: product.restaurantId,
			productId: product.id,
			name: "New Name",
		};

		await updateProductUseCase.execute(updateData);

		const updatedProduct = await getProductUseCase.execute(
			user.id,
			restaurant.id,
			product.id
		);

		expect(updatedProduct).toEqual(Object.assign(product, updateData));
	});

	it("should not be able to update a product sending a invalid restaurant ID.", () => {
		expect(async () => {
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

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant.id,
				userId: user.id,
			});

			const product = await createProductUseCase.execute({
				name: "Product",
				price: 24.75,
				categoryId: category.id,
				restaurantId: restaurant.id,
				userId: user.id,
			});

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: "invalid id",
				productId: product.id,
				name: "New Name",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a product of a restaurant that does not belong to the user.", async () => {
		expect(async () => {
			const user = await createUserUseCase.execute({
				name: "User Name",
				email: "user@email.com",
				password: "password",
			});

			const user2 = await createUserUseCase.execute({
				name: "User Name",
				email: "user2@email.com",
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

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant.id,
				userId: user.id,
			});

			const product = await createProductUseCase.execute({
				name: "Product",
				price: 24.75,
				categoryId: category.id,
				restaurantId: restaurant.id,
				userId: user.id,
			});

			const updateData = {
				userId: user2.id,
				restaurantId: product.restaurantId,
				productId: product.id,
				name: "New Name",
			};

			await updateProductUseCase.execute(updateData);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a non-existing product", () => {
		expect(async () => {
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

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				productId: "invalid id",
				name: "New Name",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a product that does not belong to the restaurant received as a parameter.", () => {
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

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant1.id,
				userId: user.id,
			});

			const product = await createProductUseCase.execute({
				name: "Product",
				price: 24.75,
				categoryId: category.id,
				restaurantId: restaurant1.id,
				userId: user.id,
			});

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: restaurant2.id,
				productId: product.id,
				name: "New Name",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a product name to a already in use one", () => {
		expect(async () => {
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

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant.id,
				userId: user.id,
			});

			await createProductUseCase.execute({
				name: "Product 1",
				price: 24.75,
				categoryId: category.id,
				restaurantId: restaurant.id,
				userId: user.id,
			});

			const product2 = await createProductUseCase.execute({
				name: "Product 2",
				price: 30.75,
				categoryId: category.id,
				restaurantId: restaurant.id,
				userId: user.id,
			});

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				productId: product2.id,
				name: "Product 1",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a product to a non-existing category", () => {
		expect(async () => {
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

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant.id,
				userId: user.id,
			});

			const product = await createProductUseCase.execute({
				name: "Product",
				price: 24.75,
				categoryId: category.id,
				restaurantId: restaurant.id,
				userId: user.id,
			});

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: restaurant.id,
				productId: product.id,
				name: "New Name",
				categoryId: "invalid id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a product to a category that does not belong to the restaurant received as a parameter.", () => {
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

			const category1 = await createCategoryUseCase.execute({
				name: "Category Restaurant 1",
				description: "Category description",
				restaurantId: restaurant1.id,
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

			const category2 = await createCategoryUseCase.execute({
				name: "Category Restaurant 2",
				description: "Category description",
				restaurantId: restaurant2.id,
				userId: user.id,
			});

			const product = await createProductUseCase.execute({
				name: "Product",
				price: 24.75,
				categoryId: category1.id,
				restaurantId: restaurant1.id,
				userId: user.id,
			});

			await updateProductUseCase.execute({
				userId: user.id,
				restaurantId: restaurant1.id,
				productId: product.id,
				name: "New Name",
				categoryId: category2.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
