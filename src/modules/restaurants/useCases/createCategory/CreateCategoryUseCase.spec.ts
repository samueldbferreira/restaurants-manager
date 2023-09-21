import "reflect-metadata";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "../../../../shared/errors/AppError";

describe("Create Category", () => {
	let categoriesRepository: ICategoriesRepository;
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let createCategoryUseCase: CreateCategoryUseCase;

	beforeEach(() => {
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
		});

		const newCategory = await createCategoryUseCase.execute({
			name: "Category Name",
			description: "Category description",
			restaurantId: restaurant.id,
		});

		expect(newCategory).toHaveProperty("id");
	});

	it("should not be able to create a category with an already existing name", () => {
		expect(async () => {
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
			});

			await createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: restaurant.id,
			});

			await createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to create a category for a non-existing restaurant", () => {
		expect(async () => {
			await createCategoryUseCase.execute({
				name: "Category Name",
				description: "Category description",
				restaurantId: "invalid id",
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
