import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../errors/AppError";
import { verify } from "jsonwebtoken";
import { UsersRepositoryPrisma } from "../../../../modules/users/repositories/prisma/UsersRepositoryPrisma";

interface IPayload {
	sub: string;
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		throw new AppError("Missing token.");
	}

	const token = authHeader.split(" ")[1];
	try {
		const { sub: userId } = verify(
			token,
			"8d302942f6cd3148f9c0fd07298aea52"
		) as IPayload;

		const usersRepository = new UsersRepositoryPrisma();

		const user = await usersRepository.findById(userId);
		if (!user) {
			throw new AppError("User does not exist.");
		}

		req.userId = userId;
	} catch (err) {
		throw new AppError("Invalid token.");
	}

	return next();
};

export { checkAuth };
