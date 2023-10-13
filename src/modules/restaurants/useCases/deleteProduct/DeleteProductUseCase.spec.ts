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
import { ListProductsUseCase } from "../listProducts/ListProductsUseCase";
import { DeleteProductUseCase } from "./DeleteProductUseCase";

describe("Delete Product", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let productsRepository: IProductsRepository;
	let createProductUseCase: CreateProductUseCase;
	let deleteProductUseCase: DeleteProductUseCase;
	let listProductsUseCase: ListProductsUseCase;

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
		deleteProductUseCase = new DeleteProductUseCase(
			restaurantsRepository,
			productsRepository
		);
		listProductsUseCase = new ListProductsUseCase(
			restaurantsRepository,
			productsRepository
		);
	});

	it("should be able to delete a product", async () => {
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

		const product1 = await createProductUseCase.execute({
			name: "Product 1",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product2 = await createProductUseCase.execute({
			name: "Product 2",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product3 = await createProductUseCase.execute({
			name: "Product 3",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		await deleteProductUseCase.execute(user.id, restaurant.id, product2.id);

		const products = await listProductsUseCase.execute({
			userId: user.id,
			restaurantId: restaurant.id,
		});

		expect(products).toEqual([product1, product3]);
	});

	it("should not be able to delete a product of a inexistent restaurant", () => {
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

			await deleteProductUseCase.execute(user.id, "invalid id", product.id);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a product of a restaurant that does not belong to the user", () => {
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

			await deleteProductUseCase.execute(user2.id, restaurant.id, product.id);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a product that does not belong to the restaurant", () => {
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

			await deleteProductUseCase.execute(user.id, restaurant2.id, product.id);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to delete a non-existing product", () => {
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

			await deleteProductUseCase.execute(
				user.id,
				restaurant.id,
				"invalid product id"
			);
		}).rejects.toBeInstanceOf(AppError);
	});
});
