import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { IRestaurantsRepository } from "../../repositories/IRestaurantsRepository";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoriesRepositoryInMemory";
import { RestaurantsRepositoryInMemory } from "../../repositories/inMemory/RestaurantsRepositoryInMemory";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { CreateRestaurantUseCase } from "../createRestaurant/CreateRestaurantUseCase";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

describe("Update Category", () => {
	let restaurantsRepository: IRestaurantsRepository;
	let createRestaurantUseCase: CreateRestaurantUseCase;
	let categoriesRepository: ICategoriesRepository;
	let createCategoryUseCase: CreateCategoryUseCase;
	let updateCategoryUseCase: UpdateCategoryUseCase;

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
		updateCategoryUseCase = new UpdateCategoryUseCase(
			restaurantsRepository,
			categoriesRepository
		);
	});

	it("should be able to update a category", async () => {
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

		const updateData = {
			categoryId: category.id,
			name: "New Name",
			description: "New Description",
			restaurantId: restaurant.id,
		};

		const updatedCategory = await updateCategoryUseCase.execute(updateData);

		expect(updatedCategory).toEqual(Object.assign(category, updateData));
	});

	it("should not be able to update a category sending an invalid restaurant ID.", () => {
		expect(async () => {
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

			const updateData = {
				categoryId: category.id,
				name: "New Name",
				description: "New Description",
				restaurantId: "invalid id",
			};

			await updateCategoryUseCase.execute(updateData);
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a non-existing category", () => {
		expect(async () => {
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

			await updateCategoryUseCase.execute({
				categoryId: "invalid id",
				name: "New Name",
				description: "New Description",
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a category that does not belong to the restaurant received as a parameter.", () => {
		expect(async () => {
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
			});

			const category = await createCategoryUseCase.execute({
				name: "Category",
				description: "Category description",
				restaurantId: restaurant1.id,
			});

			await updateCategoryUseCase.execute({
				categoryId: category.id,
				name: "New Name",
				description: "New Description",
				restaurantId: restaurant2.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to update a category name to a already in use one", () => {
		expect(async () => {
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

			await updateCategoryUseCase.execute({
				categoryId: category2.id,
				name: "Category 1",
				restaurantId: restaurant.id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
