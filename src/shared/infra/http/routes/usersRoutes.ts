import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { GetUserController } from "../../../../modules/users/useCases/getUser/GetUserController";
import { DeleteUserController } from "../../../../modules/users/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "../../../../modules/users/useCases/updateUser/UpdateUserController";
import { validateSchema } from "../middlewares/validateSchema";
import {
	CreateUserSchema,
	UpdateUserSchema,
} from "../../../schemas/UsersSchemas";

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const updatedUserController = new UpdateUserController();
const deleteUserUseCase = new DeleteUserController();

const usersRoutes = Router();

usersRoutes.post(
	"/users",
	validateSchema(CreateUserSchema),
	createUserController.handle
);

usersRoutes.get("/users", checkAuth, getUserController.handle);

usersRoutes.patch(
	"/users",
	validateSchema(UpdateUserSchema),
	checkAuth,
	updatedUserController.handle
);

usersRoutes.delete("/users", checkAuth, deleteUserUseCase.handle);

export { usersRoutes };
