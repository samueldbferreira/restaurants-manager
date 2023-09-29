import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;

		const getUserUseCase = container.resolve(GetUserUseCase);

		const user = await getUserUseCase.execute(userId);

		return res
			.status(200)
			.json({ id: user.id, name: user.name, email: user.email });
	}
}

export { GetUserController };
