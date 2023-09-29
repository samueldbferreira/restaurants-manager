import { Router } from "express";
import { GetTokenController } from "../../../../modules/users/useCases/getToken/GetTokenController";

const getTokenController = new GetTokenController();

const authRoutes = Router();

authRoutes.post("/auth", getTokenController.handle);

export { authRoutes };
