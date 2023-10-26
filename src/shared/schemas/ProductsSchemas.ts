import { z } from "zod";

export const CreateProductSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
	}),
	body: z.object({
		name: z
			.string({ required_error: "Name is required." })
			.min(1, "Invalid product name."),
		price: z.number({ required_error: "Price is required." }),
		categoryId: z
			.string({ required_error: "Category ID is required." })
			.uuid("Invalid category ID."),
	}),
});

export const UpdateProductSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
		productId: z.string().uuid("Invalid product ID."),
	}),
	body: z.object({
		name: z.string().min(1, "Invalid product name.").optional(),
		price: z.number().optional(),
		categoryId: z.string().uuid("Invalid category ID.").optional(),
	}),
});
