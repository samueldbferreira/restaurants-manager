import { z } from "zod";

export const CreateUserSchema = z.object({
	body: z.object({
		name: z.string({
			required_error: "Name is required.",
			invalid_type_error: "Name must be a string.",
		}),
		email: z.string({ required_error: "Email is required." }).email(),
		password: z
			.string({
				required_error: "Password is required.",
				invalid_type_error: "Password must be a string.",
			})
			.min(12),
	}),
});

export const UpdateUserSchema = z.object({
	headers: z.object({
		authorization: z.string({
			required_error: "Authorization token is required.",
		}),
	}),
	body: z.object({
		name: z.string({ invalid_type_error: "Name must be a string." }).optional(),
		email: z.string().email().optional(),
		password: z
			.string({ invalid_type_error: "Password must be a string." })
			.min(12)
			.optional(),
	}),
});
