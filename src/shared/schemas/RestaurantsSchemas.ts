import { z } from "zod";

const Hour = z.string().regex(/^[0-9][0-9]:[0-9][0-9]$/);

const DaySchema = z.object({
	start: Hour,
	end: Hour,
});

const ScheduleSchema = z.object({
	sun: DaySchema,
	mon: DaySchema,
	tue: DaySchema,
	wed: DaySchema,
	thu: DaySchema,
	fri: DaySchema,
	sat: DaySchema,
});

export const CreateRestaurantSchema = z.object({
	body: z.object({
		name: z
			.string({
				required_error: "Name is required",
				invalid_type_error: "Name must be a string.",
			})
			.min(1, "Invalid name."),
		address: z
			.string({
				required_error: "Address is required.",
				invalid_type_error: "Address must be a string.",
			})
			.min(1, "Invalid address."),
		schedule: z
			.string({ required_error: "Schedule is required." })
			.refine((value) => {
				try {
					const parsedSchedule = JSON.parse(value);
					ScheduleSchema.parse(parsedSchedule);
					return true;
				} catch (_) {
					return false;
				}
			}, "Invalid schedule format."),
	}),
});

export const UpdateRestaurantSchema = z.object({
	body: z.object({
		name: z
			.string({ invalid_type_error: "Name must be a string." })
			.min(1, "Invalid name.")
			.optional(),
		address: z
			.string({ invalid_type_error: "Address must be a string." })
			.min(1, "Invalid address.")
			.optional(),
		schedule: z
			.string()
			.refine((value) => {
				try {
					const parsedSchedule = JSON.parse(value);
					ScheduleSchema.parse(parsedSchedule);
					return true;
				} catch (_) {
					return false;
				}
			}, "Invalid schedule format.")
			.optional(),
	}),
});
