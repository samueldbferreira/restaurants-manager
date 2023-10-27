import { z } from "zod";

export const CreateCategorySchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
	}),
	body: z.object({
		name: z
			.string({
				required_error: "Name is required.",
				invalid_type_error: "Name must be a string.",
			})
			.min(1, "Invalid name."),
		description: z
			.string({
				required_error: "Description is required.",
				invalid_type_error: "Description must be a string.",
			})
			.min(1, "Invalid Description."),
	}),
});

export const UpdateCategorySchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
		categoryId: z.string().uuid("Invalid category ID."),
	}),
	body: z.object({
		name: z
			.string({ invalid_type_error: "Name must be a string." })
			.min(1, "Invalid name.")
			.optional(),
		description: z
			.string({ invalid_type_error: "Description must be a string." })
			.min(1, "Invalid Description.")
			.optional(),
	}),
});
