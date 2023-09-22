interface IProduct {
	id: string;
	photo: string | null;
	name: string;
	price: number;
	categoryId: string;
	restaurantId: string;
	createdAt: Date;
}

export { IProduct };
