import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";

const validateSchema = (schema: AnyZodObject) => {
	return (req: Request, _: Response, next: NextFunction) => {
		try {
			schema.parse({
				headers: req.headers,
				params: req.params,
				body: req.body,
				file: req.file,
				files: req.files,
			});

			return next();
		} catch (e) {
			if (e instanceof ZodError) {
				throw new AppError(e.errors[0].message);
			} else {
				throw new AppError("Internal server error.", 500);
			}
		}
	};
};

export { validateSchema };
