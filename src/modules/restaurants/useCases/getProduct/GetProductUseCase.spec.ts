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
		getProductUseCase = new GetProductUseCase(productsRepository);
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
		});

		const product = await createProductUseCase.execute({
			name: "Coca Cola 2L",
			price: 8.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
		});

		const returnedProduct = await getProductUseCase.execute(product.id);

		expect(returnedProduct.id).toEqual(product.id);
	});

	it("should not be able to get a inexistent product", () => {
		expect(async () => {
			await getProductUseCase.execute("invalid id product");
		}).rejects.toBeInstanceOf(AppError);
	});
});
