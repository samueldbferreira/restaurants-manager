import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUser } from "../entities/IUser";

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<IUser>;

	findByEmail(email: string): Promise<IUser | null>;

	findById(id: string): Promise<IUser | null>;

	delete(id: string): Promise<void>;
}

export { IUsersRepository };
