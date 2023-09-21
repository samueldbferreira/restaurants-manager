import "reflect-metadata";
import "../../container";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { routes } from "./routes";
import { AppError } from "../../errors/AppError";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			message: error.message,
		});
	} else {
		return res.status(500).json({
			message: `Internal server error - ${error.message}`,
		});
	}
});

export { app };
