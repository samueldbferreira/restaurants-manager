interface ICreateProductDTO {
	photo?: string;
	name: string;
	price: number;
	categoryId: string;
	restaurantId: string;
}

export { ICreateProductDTO };
