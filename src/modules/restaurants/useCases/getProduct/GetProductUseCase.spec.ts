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
import { GetProductUseCase } from "./GetProductUseCase";

describe("Get Product", () => {
	let usersRepository: IUsersRepository;
	let createUserUseCase: CreateUserUseCase;
	let restaurantsRepository: IRestaurantsRepository;
	let categoriesRepository: ICategoriesRepository;
	let productsRepository: IProductsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let createCategoryUseCase: CreateCategoryUseCase;
	let createProductUseCase: CreateProductUseCase;
	let getProductUseCase: GetProductUseCase;

	beforeEach(() => {
		usersRepository = new UsersRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(usersRepository);
		restaurantsRepository = new RestaurantsRepositoryInMemory();
		categoriesRepository = new CategoriesRepositoryInMemory();
		productsRepository = new ProductsRepositoryInMemory();

		createRestaurantUseCase = new CreateRestaurantUseCase(
			restaurantsRepository
		);
		createCategoryUseCase = new CreateCategoryUseCase(
			categoriesRepository,
			restaurantsRepository
		);
		createProductUseCase = new CreateProductUseCase(
			restaurantsRepository,
			categoriesRepository,
			productsRepository
		);
		getProductUseCase = new GetProductUseCase(
			restaurantsRepository,
			productsRepository
		);
	});

	it("should be able to get a product", async () => {
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
			name: "Category",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product = await createProductUseCase.execute({
			name: "Coca Cola 2L",
			price: 8.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const returnedProduct = await getProductUseCase.execute(
			user.id,
			restaurant.id,
			product.id
		);

		expect(returnedProduct.id).toEqual(product.id);
	});

	it("should not be able to get a product of a inexistent restaurant.", async () => {
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
			name: "Category",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product = await createProductUseCase.execute({
			name: "Coca Cola 2L",
			price: 8.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		await expect(
			getProductUseCase.execute(user.id, "invalid restaurant id", product.id)
		).rejects.toEqual(new AppError("Invalid restaurant id."));
	});

	it("should not be able to get a product of a restaurant that does not belong to the user", async () => {
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
			name: "Category",
			description: "Category description",
			restaurantId: restaurant.id,
			userId: user.id,
		});

		const product = await createProductUseCase.execute({
			name: "Coca Cola 2L",
			price: 8.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
			userId: user.id,
		});

		await expect(
			getProductUseCase.execute(user2.id, restaurant.id, product.id)
		).rejects.toEqual(new AppError("Restaurant does not belong to this user."));
	});

	it("should not be able to get a inexistent product", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const restaurant = await createRestaurantUseCase.execute({
			name: "restaurant ",
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

		await expect(
			getProductUseCase.execute(user.id, restaurant.id, "invalid product id")
		).rejects.toEqual(new AppError("Product not found", 404));
	});

	it("should not be able to get a product that does not belong to the restaurant", async () => {
		const user = await createUserUseCase.execute({
			name: "User Name",
			email: "user@email.com",
			password: "password",
		});

		const restaurant1 = await createRestaurantUseCase.execute({
			name: "Restaurant 1",
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
			name: "Restaurant 2",
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
			name: "Coca Cola 2L",
			price: 8.75,
			categoryId: category.id,
			restaurantId: restaurant1.id,
			userId: user.id,
		});

		await expect(
			getProductUseCase.execute(user.id, restaurant2.id, product.id)
		).rejects.toEqual(
			new AppError("Product does not belong to this restaurant.")
		);
	});
});
