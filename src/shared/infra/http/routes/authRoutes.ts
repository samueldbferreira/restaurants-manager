import { Router } from "express";
import { GetTokenController } from "../../../../modules/users/useCases/getToken/GetTokenController";
import { validateSchema } from "../middlewares/validateSchema";
import { GetTokenSchema } from "../../../schemas/AuthSchemas";

const getTokenController = new GetTokenController();

const authRoutes = Router();

authRoutes.post(
	"/auth",
	validateSchema(GetTokenSchema),
	getTokenController.handle
);

export { authRoutes };
