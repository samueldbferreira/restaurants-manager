import { v4 as uuid } from "uuid";
import { ICategory } from "../ICategory";

interface IConstructor {
	id?: string;
	name: string;
	description: string;
	restaurantId: string;
}

class Category implements ICategory {
	id: string;
	name: string;
	description: string;
	restaurantId: string;

	constructor(data: IConstructor) {
		if (data.id) {
			this.id = data.id;
		} else {
			this.id = uuid();
		}

		this.name = data.name;
		this.description = data.description;
		this.restaurantId = data.restaurantId;
	}
}

export { Category };
