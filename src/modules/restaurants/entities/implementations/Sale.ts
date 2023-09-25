import { v4 as uuid } from "uuid";
import { ISale } from "../ISale";

interface IConstructor {
	id?: string;
	title: string;
	description: string;
	discount: number;
	restaurantId: string;
	createdAt?: Date;
}

class Sale implements ISale {
	id: string;
	title: string;
	description: string;
	discount: number;
	restaurantId: string;
	createdAt: Date;

	constructor(data: IConstructor) {
		if (data.id) {
			this.id = data.id;
		} else {
			this.id = uuid();
		}

		if (data.createdAt) {
			this.createdAt = data.createdAt;
		} else {
			this.createdAt = new Date();
		}

		this.title = data.title;
		this.description = data.description;
		this.discount = data.discount;
		this.restaurantId = data.restaurantId;
	}
}

export { Sale };
