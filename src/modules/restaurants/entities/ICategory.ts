import { IProduct } from "./IProduct";

interface ICategory {
	id: string;
	name: string;
	description: string;
	Product?: IProduct[];
	restaurantId: string;
}

export { ICategory };
