import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;
		const { name, email, password } = req.body;

		const updateUserUseCase = container.resolve(UpdateUserUseCase);

		const updatedUser = await updateUserUseCase.execute({
			id: userId,
			name,
			email,
			password,
		});

		return res
			.status(200)
			.json({ id: userId, name: updatedUser.name, email: updatedUser.email });
	}
}

export { UpdateUserController };
