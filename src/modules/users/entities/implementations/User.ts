import { v4 as uuid } from "uuid";
import { IUser } from "../IUser";

interface IConstructor {
	id?: string;
	name: string;
	email: string;
	password: string;
}

class User implements IUser {
	id: string;
	name: string;
	email: string;
	password: string;

	constructor(data: IConstructor) {
		if (data.id) {
			this.id = data.id;
		} else {
			this.id = uuid();
		}
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
	}
}

export { User };
