import { v4 as uuid } from "uuid";
import { IProduct } from "../IProduct";

interface IConstructor {
	id?: string;
	photo?: string;
	name: string;
	price: number;
	categoryId: string;
	restaurantId: string;
	createdAt?: Date;
}

class Product implements IProduct {
	id: string;
	photo: string | null;
	name: string;
	price: number;
	categoryId: string;
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

		this.photo = data.photo || null;
		this.name = data.name;
		this.price = data.price;
		this.categoryId = data.categoryId;
		this.restaurantId = data.restaurantId;
	}
}

export { Product };
