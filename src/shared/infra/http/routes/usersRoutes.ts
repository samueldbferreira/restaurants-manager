import { Router } from "express";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { GetUserController } from "../../../../modules/users/useCases/getUser/GetUserController";
import { checkAuth } from "../middlewares/checkAuth";

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

const usersRoutes = Router();

usersRoutes.post("/users", createUserController.handle);
usersRoutes.get("/users", checkAuth, getUserController.handle);

export { usersRoutes };
