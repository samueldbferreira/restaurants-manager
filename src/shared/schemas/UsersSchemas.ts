import { z } from "zod";

export const CreateUserSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required." }),
		email: z.string({ required_error: "Email is required." }).email(),
		password: z.string({ required_error: "Password is required." }).min(12),
	}),
});

export const UpdateUserSchema = z.object({
	headers: z.object({
		authorization: z.string({
			required_error: "Authorization token is required.",
		}),
	}),
	body: z.object({
		name: z.string().optional(),
		email: z.string().email().optional(),
		password: z.string().min(12).optional(),
	}),
});
