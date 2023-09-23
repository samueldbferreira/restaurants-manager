import { AppError } from "../../../../shared/errors/AppError";
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
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let productsRepository: IProductsRepository;
	let createProductUseCase: CreateProductUseCase;
	let deleteProductUseCase: DeleteProductUseCase;
	let listProductsUseCase: ListProductsUseCase;

	beforeEach(() => {
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
		deleteProductUseCase = new DeleteProductUseCase(productsRepository);
		listProductsUseCase = new ListProductsUseCase(
			restaurantsRepository,
			productsRepository
		);
	});

	it("should be able to delete a product", async () => {
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
		});

		const category = await createCategoryUseCase.execute({
			name: "Category",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		const product1 = await createProductUseCase.execute({
			name: "Product 1",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
		});

		const product2 = await createProductUseCase.execute({
			name: "Product 2",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
		});

		const product3 = await createProductUseCase.execute({
			name: "Product 3",
			price: 24.75,
			categoryId: category.id,
			restaurantId: restaurant.id,
		});

		await deleteProductUseCase.execute(product2.id);

		const products = await listProductsUseCase.execute({
			restaurantId: restaurant.id,
		});

		expect(products).toEqual([product1, product3]);
	});

	it("should not be able to delete a non-existing product", () => {
		expect(async () => {
			await deleteProductUseCase.execute("invalid product id");
		}).rejects.toBeInstanceOf(AppError);
	});
});
