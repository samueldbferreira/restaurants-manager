import { z } from "zod";

export const AddSaleProductsSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
		saleId: z.string().uuid("Invalid sale ID."),
	}),
	body: z.object({
		products: z.array(z.string().uuid("Invalid array of sales.")),
	}),
});

export const RemoveSaleProductsSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
		saleId: z.string().uuid("Invalid sale ID."),
	}),
	body: z.object({
		products: z.array(z.string().uuid("Invalid array of sales.")),
	}),
});

export const CreateSaleSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
	}),
	body: z.object({
		title: z
			.string({
				required_error: "Title is required.",
				invalid_type_error: "Title must be a string.",
			})
			.min(1, "Invalid title."),
		description: z
			.string({
				required_error: "Description is required.",
				invalid_type_error: "Description must be a string.",
			})
			.min(1, "Invalid description."),
		discount: z
			.number({
				required_error: "Discount is required.",
				invalid_type_error: "Discount must be a number.",
			})
			.min(0.01, "Invalid discount value.")
			.max(0.9, "Invalid discount value."),
	}),
});

export const UpdateSaleSchema = z.object({
	params: z.object({
		restaurantId: z.string().uuid("Invalid restaurant ID."),
		saleId: z.string().uuid("Invalid sale ID."),
	}),
	body: z.object({
		title: z
			.string({ invalid_type_error: "Title must be a string." })
			.min(1, "Invalid title.")
			.optional(),
		description: z
			.string({ invalid_type_error: "Description must be a string." })
			.min(1, "Invalid description.")
			.optional(),
		discount: z
			.number({ invalid_type_error: "Discount must be a number." })
			.min(0.01, "Invalid discount value.")
			.max(0.9, "Invalid discount value.")
			.optional(),
	}),
});
