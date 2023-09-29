import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
	async handle(req: Request, res: Response) {
		const userId = req.userId;

		const deleteUserUseCase = container.resolve(DeleteUserUseCase);

		await deleteUserUseCase.execute(userId);

		return res.status(204).send();
	}
}

export { DeleteUserController };
