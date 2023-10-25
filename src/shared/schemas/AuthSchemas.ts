import { z } from "zod";

export const GetTokenSchema = z.object({
	body: z.object({
		email: z.string({ required_error: "Email is required." }).email(),
		password: z
			.string({ required_error: "Password is required." })
			.min(12, "Password must contain at least 12 characters."),
	}),
});
