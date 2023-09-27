import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
	async handle(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		const newUser = await createUserUseCase.execute({
			name,
			email,
			password,
		});

		return res
			.status(201)
			.json({ id: newUser.id, name: newUser.name, email: newUser.email });
	}
}

export { CreateUserController };
