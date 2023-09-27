import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetTokenUseCase } from "./GetTokenUseCase";

class GetTokenController {
	async handle(req: Request, res: Response) {
		const { email, password } = req.body;

		const getTokenUseCase = container.resolve(GetTokenUseCase);

		const token = await getTokenUseCase.execute({ email, password });

		return res.status(200).json({ token });
	}
}

export { GetTokenController };
