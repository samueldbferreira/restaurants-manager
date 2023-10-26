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
			.string({ required_error: "Title is required." })
			.min(1, "Invalid title."),
		description: z
			.string({ required_error: "Description is required." })
			.min(1, "Invalid description."),
		discount: z
			.number({ required_error: "Discount is required." })
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
		title: z.string().min(1, "Invalid title.").optional(),
		description: z.string().min(1, "Invalid description.").optional(),
		discount: z
			.number()
			.min(0.01, "Invalid discount value.")
			.max(0.9, "Invalid discount value.")
			.optional(),
	}),
});
