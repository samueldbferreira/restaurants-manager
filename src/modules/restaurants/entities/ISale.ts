import { IProduct } from "./IProduct";

interface ISale {
	id: string;
	title: string;
	description: string;
	discount: number;
	restaurantId: string;
	createdAt: Date;
	Product?: IProduct[];
}

export { ISale };
